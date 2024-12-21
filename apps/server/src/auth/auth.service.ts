import { Injectable } from '@nestjs/common';
import { SignUpDto, SignInDto, UpdatePasswordDto } from './dto/auth.dto';
import { MockService } from '../common/mock/mock.service';

@Injectable()
export class AuthService {
  constructor(private readonly mockService: MockService) {}

  async signUp(signUpDto: SignUpDto) {
    // 새 사용자 생성
    const user = this.mockService.createMockUser(signUpDto.email);

    // 토큰 생성
    const tokens = this.mockService.generateMockTokens();

    return {
      user,
      ...tokens
    };
  }

  async signIn(signInDto: SignInDto) {
    // 사용자 찾기
    const user = this.mockService.findMockUserByEmail(signInDto.email);

    if (!user) {
      return null;
    }

    // 토큰 생성
    const tokens = this.mockService.generateMockTokens();

    return {
      user,
      ...tokens
    };
  }

  async signOut(userId: string) {
    return { success: true };
  }

  async resetPassword(email: string) {
    return { success: true };
  }

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    return { success: true };
  }

  async validateToken(token: string) {
    return { 
      valid: true,
      id: token // 더미 데이터에서는 토큰을 userId로 사용
    };
  }

  async getProfile(userId: string) {
    return this.mockService.getMockUser(userId);
  }

  async refreshToken(refreshToken: string) {
    // 새 토큰 생성
    const tokens = this.mockService.generateMockTokens();
    
    return tokens;
  }
} 