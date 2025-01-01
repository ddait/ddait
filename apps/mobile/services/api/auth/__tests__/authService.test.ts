import { AuthService } from '../authService';
import { LoginCredentials, SignupCredentials, AuthResponse } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let mockApi: any;

  const mockAuthResponse: AuthResponse = {
    token: 'mock-token',
    user: {
      id: '1',
      email: 'test@example.com',
      nickname: 'testuser'
    }
  };

  beforeEach(() => {
    mockApi = {
      post: jest.fn()
    };
    authService = new AuthService(mockApi);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const credentials: LoginCredentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    it('should successfully login and save token', async () => {
      mockApi.post.mockResolvedValueOnce({ data: mockAuthResponse });

      const response = await authService.login(credentials);

      expect(mockApi.post).toHaveBeenCalledWith('/auth/login', credentials);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', mockAuthResponse.token);
      expect(response).toEqual(mockAuthResponse);
    });

    it('should handle login error', async () => {
      const mockError = {
        response: {
          data: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password'
          }
        }
      };
      mockApi.post.mockRejectedValueOnce(mockError);

      await expect(authService.login(credentials)).rejects.toEqual(mockError.response.data);
    });
  });

  describe('signup', () => {
    const credentials: SignupCredentials = {
      email: 'test@example.com',
      password: 'password123',
      nickname: 'testuser'
    };

    it('should successfully signup and save token', async () => {
      mockApi.post.mockResolvedValueOnce({ data: mockAuthResponse });

      const response = await authService.signup(credentials);

      expect(mockApi.post).toHaveBeenCalledWith('/auth/signup', credentials);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', mockAuthResponse.token);
      expect(response).toEqual(mockAuthResponse);
    });

    it('should handle signup error', async () => {
      const mockError = {
        response: {
          data: {
            code: 'EMAIL_ALREADY_EXISTS',
            message: 'Email already exists'
          }
        }
      };
      mockApi.post.mockRejectedValueOnce(mockError);

      await expect(authService.signup(credentials)).rejects.toEqual(mockError.response.data);
    });
  });

  describe('logout', () => {
    it('should remove token from storage', async () => {
      await authService.logout();

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('token');
    });
  });
}); 