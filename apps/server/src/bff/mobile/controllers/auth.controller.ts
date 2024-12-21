import { Controller, Post, Body, Headers, Get, UseGuards } from '@nestjs/common';
import { AuthService } from '../../../auth/auth.service';
import { SignUpDto, SignInDto, UpdatePasswordDto } from '../../../auth/dto/auth.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('mobile/auth')
export class MobileAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Post('signout')
  async signOut(@Headers('authorization') token: string) {
    const userId = token.split(' ')[1]; // Bearer token에서 token 부분만 추출
    return this.authService.signOut(userId);
  }

  @Post('reset-password')
  async resetPassword(@Body('email') email: string) {
    return this.authService.resetPassword(email);
  }

  @UseGuards(AuthGuard)
  @Post('update-password')
  async updatePassword(
    @Headers('authorization') token: string,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    const userId = token.split(' ')[1];
    return this.authService.updatePassword(userId, updatePasswordDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Headers('authorization') token: string) {
    const userId = token.split(' ')[1];
    return this.authService.getProfile(userId);
  }

  @Post('refresh')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
} 