import { Injectable } from '@nestjs/common';
import { SignUpDto } from '../auth/dto/auth.dto';

@Injectable()
export class MockService {
  private mockUsers: any[] = [];

  async createMockUser(signUpDto: SignUpDto) {
    const mockUser = {
      id: `user-${Date.now()}`,
      email: signUpDto.email,
      password: signUpDto.password,
      name: signUpDto.name,
      avatarUrl: 'https://example.com/avatar.jpg',
    };
    this.mockUsers.push(mockUser);
    return {
      id: mockUser.id,
      email: mockUser.email,
      name: mockUser.name,
      avatarUrl: mockUser.avatarUrl,
    };
  }

  async findMockUserByEmail(email: string) {
    return this.mockUsers.find(user => user.email === email);
  }

  async findMockUserById(id: string) {
    return this.mockUsers.find(user => user.id === id);
  }

  async generateMockTokens() {
    return {
      accessToken: `mock-access-token-${Date.now()}`,
      refreshToken: `mock-refresh-token-${Date.now()}`,
    };
  }

  async validateMockToken(token: string) {
    return {
      valid: token.startsWith('mock-access-token-'),
      id: 'mock-user-id',
    };
  }
} 