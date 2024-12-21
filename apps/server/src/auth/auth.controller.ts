import { Body, Controller, Get, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignUpDto, SignInDto, UpdatePasswordDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('google')
  async googleAuth() {
    // Google OAuth 로그인 엔드포인트는 별도로 구현 필요
    throw new Error('Not implemented');
  }

  @Post('signout')
  @UseGuards(AuthGuard)
  async signOut(@Headers('authorization') token: string) {
    const user = await this.authService.validateToken(token);
    return this.authService.signOut(user.id);
  }

  @Post('reset-password')
  async resetPassword(@Body('email') email: string) {
    return this.authService.resetPassword(email);
  }

  @Post('update-password')
  @UseGuards(AuthGuard)
  async updatePassword(
    @Headers('authorization') token: string,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    const user = await this.authService.validateToken(token);
    return this.authService.updatePassword(
      user.id,
      updatePasswordDto.currentPassword,
      updatePasswordDto.newPassword
    );
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Headers('authorization') token: string) {
    const user = await this.authService.validateToken(token);
    return this.authService.getProfile(user.id);
  }

  @Post('refresh')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
} 