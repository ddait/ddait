import { Body, Controller, Get, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('username') username: string
  ) {
    return this.authService.signUp(email, password, username);
  }

  @Post('signin')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    return this.authService.signIn(email, password);
  }

  @Get('google')
  async signInWithGoogle() {
    return this.authService.signInWithGoogle();
  }

  @Post('signout')
  @UseGuards(AuthGuard)
  async signOut(@Headers('authorization') token: string) {
    return this.authService.signOut(token);
  }

  @Post('reset-password')
  async resetPassword(@Body('email') email: string) {
    return this.authService.resetPassword(email);
  }

  @Post('update-password')
  @UseGuards(AuthGuard)
  async updatePassword(@Body('newPassword') newPassword: string) {
    return this.authService.updatePassword(newPassword);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async getUser(@Headers('authorization') token: string) {
    return this.authService.getUser(token);
  }

  @Post('refresh')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
} 