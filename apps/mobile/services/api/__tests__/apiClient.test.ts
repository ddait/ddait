import { createApiClient } from '../core/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

type MockAxiosInstance = {
  create: jest.Mock<any>;
  defaults: {
    baseURL: string;
    timeout: number;
    headers: {
      common: Record<string, string>;
    };
  };
  interceptors: {
    request: { use: jest.Mock };
    response: { use: jest.Mock };
  };
  get: jest.Mock;
};

jest.mock('axios', () => {
  const mockAxios: MockAxiosInstance = {
    create: jest.fn((config: AxiosRequestConfig) => ({
      ...mockAxios,
      defaults: {
        ...mockAxios.defaults,
        ...config,
        headers: {
          common: {
            'Content-Type': 'application/json',
            ...(config.headers?.common || {})
          }
        }
      }
    })),
    defaults: {
      baseURL: '',
      timeout: 0,
      headers: {
        common: {}
      }
    },
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    },
    get: jest.fn()
  };
  return mockAxios;
});

describe('API Client', () => {
  let mockAxios: MockAxiosInstance;
  
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios = axios as unknown as MockAxiosInstance;
  });

  it('should create an axios instance with default config', () => {
    const client = createApiClient();
    
    expect(client.defaults.baseURL).toBe(Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000');
    expect(client.defaults.timeout).toBe(10000);
    expect(client.defaults.headers.common['Content-Type']).toBe('application/json');
  });

  it('should handle custom config', () => {
    const customConfig = {
      baseURL: 'https://api.example.com',
      timeout: 5000,
    };
    
    const client = createApiClient(customConfig);
    
    expect(client.defaults.baseURL).toBe(customConfig.baseURL);
    expect(client.defaults.timeout).toBe(customConfig.timeout);
  });

  it('should add auth token to headers if exists', async () => {
    const token = 'test-token';
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(token);
    
    const client = createApiClient();
    const requestInterceptor = mockAxios.interceptors.request.use.mock.calls[0][0];
    
    const config = await requestInterceptor({ headers: {} });
    expect(config.headers.Authorization).toBe(`Bearer ${token}`);
  });

  it('should remove token on 401 response', async () => {
    const client = createApiClient();
    const responseInterceptor = mockAxios.interceptors.response.use.mock.calls[0][1];
    
    await responseInterceptor({ response: { status: 401 } }).catch(() => {});
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('token');
  });
}); 