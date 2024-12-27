import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const DEFAULT_CONFIG: AxiosRequestConfig = {
  baseURL: Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
};

export function createApiClient(config: AxiosRequestConfig = {}): AxiosInstance {
  const instance = axios.create({
    ...DEFAULT_CONFIG,
    ...config,
  });

  // Set default headers
  instance.defaults.headers.common['Content-Type'] = 'application/json';

  // Request interceptor
  instance.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        await AsyncStorage.removeItem('token');
      }
      return Promise.reject(error);
    }
  );

  return instance;
} 