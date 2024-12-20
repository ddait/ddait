import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../auth/auth.guard';

@Controller('mobile/auth')
export class MobileAuthController {
  @Post('signup')
  async signup(@Body() signupDto: any) {
    // 모바일에 최적화된 회원가입 응답
    return {
      success: true,
      data: {
        // 필요한 최소한의 사용자 정보만 반환
        id: 'user-id',
        email: signupDto.email,
      }
    };
  }

  @Post('login')
  async login(@Body() loginDto: any) {
    // 모바일에 최적화된 로그인 응답
    return {
      success: true,
      data: {
        token: 'access-token',
        user: {
          id: 'user-id',
          email: loginDto.email,
        }
      }
    };
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile() {
    // 모바일에 최적화된 프로필 정보
    return {
      success: true,
      data: {
        id: 'user-id',
        email: 'user@example.com',
        name: 'User Name',
        avatar: 'avatar-url'
      }
    };
  }
} 