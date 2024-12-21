import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { MockService } from '../common/mock/mock.service';
import { SignUpDto, SignInDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly mockService: MockService
  ) {}

  async signUp(signUpDto: SignUpDto) {
    // 더미 데이터 생성
    const mockUser = this.mockService.createMockUser({
      email: signUpDto.email,
      username: signUpDto.username,
      avatarUrl: signUpDto.avatarUrl
    });

    return {
      user: mockUser,
      session: {
        access_token: this.mockService.generateMockToken(),
        refresh_token: this.mockService.generateMockRefreshToken()
      }
    };
  }

  async signIn(signInDto: SignInDto) {
    // 더미 데이터에서 사용자 찾기
    const mockUser = Array.from(this.mockService['mockUsers'].values()).find(
      user => user.email === signInDto.email
    );

    if (!mockUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      user: mockUser,
      session: {
        access_token: this.mockService.generateMockToken(),
        refresh_token: this.mockService.generateMockRefreshToken()
      }
    };
  }

  async signOut(userId: string) {
    // 실제로는 토큰 무효화 등의 작업이 필요하지만, 더미에서는 단순 응답
    return { message: 'Successfully signed out' };
  }

  async resetPassword(email: string) {
    // 더미 데이터에서 사용자 확인
    const mockUser = Array.from(this.mockService['mockUsers'].values()).find(
      user => user.email === email
    );

    if (!mockUser) {
      throw new UnauthorizedException('User not found');
    }

    return { message: 'Password reset email sent' };
  }

  async updatePassword(userId: string, currentPassword: string, newPassword: string) {
    // 더미 데이터에서 사용자 확인
    const mockUser = this.mockService.getMockUser(userId);
    if (!mockUser) {
      throw new UnauthorizedException('User not found');
    }

    return { message: 'Password updated successfully' };
  }

  async validateToken(token: string) {
    // 더미 토큰 검증 (실제로는 JWT 검증 등이 필요)
    if (!token.startsWith('mock_token_')) {
      throw new UnauthorizedException('Invalid token');
    }

    // 첫 번째 사용자 반환
    const mockUser = Array.from(this.mockService['mockUsers'].values())[0];
    if (!mockUser) {
      throw new UnauthorizedException('User not found');
    }

    return mockUser;
  }

  async getProfile(userId: string) {
    // 더미 데이터에서 프로필 조회
    const mockUser = this.mockService.getMockUser(userId);
    if (!mockUser) {
      throw new UnauthorizedException('User not found');
    }

    return mockUser;
  }

  async refreshToken(refreshToken: string) {
    // 더미 토큰 갱신
    if (!refreshToken.startsWith('mock_refresh_token_')) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return {
      access_token: this.mockService.generateMockToken(),
      refresh_token: this.mockService.generateMockRefreshToken()
    };
  }
} 