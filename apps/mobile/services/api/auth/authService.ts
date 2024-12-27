import { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCredentials, SignupCredentials, AuthResponse, AuthError } from './types';

export class AuthService {
  constructor(private readonly api: AxiosInstance) {}

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>('/auth/login', credentials);
      await this.saveToken(response.data.token);
      return response.data;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>('/auth/signup', credentials);
      await this.saveToken(response.data.token);
      return response.data;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('token');
  }

  private async saveToken(token: string): Promise<void> {
    await AsyncStorage.setItem('token', token);
  }

  private handleAuthError(error: any): AuthError {
    if (error.response?.data?.code) {
      return error.response.data as AuthError;
    }

    return {
      code: 'INVALID_CREDENTIALS',
      message: 'An unexpected error occurred'
    };
  }
} 