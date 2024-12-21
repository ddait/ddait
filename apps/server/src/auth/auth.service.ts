import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto, SignInDto, UpdatePasswordDto } from './dto/auth.dto';
import { MockService } from '../mock/mock.service';

@Injectable()
export class AuthService {
  constructor(private readonly mockService: MockService) {}

  async signUp(signUpDto: SignUpDto) {
    return this.mockService.createMockUser(signUpDto);
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.mockService.findMockUserByEmail(signInDto.email);
    if (!user || user.password !== signInDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const tokens = await this.mockService.generateMockTokens();
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  async validateToken(token: string) {
    const result = await this.mockService.validateMockToken(token);
    if (!result.valid) {
      throw new UnauthorizedException();
    }
    return result;
  }

  async getProfile(userId: string) {
    const user = await this.mockService.findMockUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
    };
  }

  async signOut(userId: string) {
    // 실제 구현에서는 토큰 무효화 등의 작업 수행
    return { success: true };
  }

  async resetPassword(email: string) {
    const user = await this.mockService.findMockUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    // 실제 구현에서는 비밀번호 재설정 이메일 발송 등의 작업 수행
    return { success: true };
  }

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.mockService.findMockUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.password !== updatePasswordDto.currentPassword) {
      throw new UnauthorizedException('Invalid current password');
    }
    // 실제 구현에서는 비밀번호 업데이트 작업 수행
    return { success: true };
  }

  async refreshToken(refreshToken: string) {
    // 실제 구현에서는 리프레시 토큰 검증 및 새 토큰 발급
    return {
      accessToken: `new-access-token-${Date.now()}`,
      refreshToken: `new-refresh-token-${Date.now()}`
    };
  }
} 