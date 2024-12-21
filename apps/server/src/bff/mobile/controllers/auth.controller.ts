import { Controller, Post, Body, Get, Headers, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../../../auth/auth.service';
import { AuthGuard } from '../../../auth/auth.guard';
import { SignUpDto, SignInDto, UpdatePasswordDto } from '../../../auth/dto/auth.dto';

@ApiTags('Mobile Auth')
@Controller('mobile/auth')
export class MobileAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({ status: 200, description: 'User successfully signed in' })
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('signout')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Sign out a user' })
  @ApiResponse({ status: 200, description: 'User successfully signed out' })
  async signOut(@Headers('authorization') token: string) {
    const user = await this.authService.validateToken(token);
    return this.authService.signOut(user.id);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  async resetPassword(@Body('email') email: string) {
    return this.authService.resetPassword(email);
  }

  @Post('update-password')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ status: 200, description: 'Password successfully updated' })
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
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved' })
  async getProfile(@Headers('authorization') token: string) {
    const user = await this.authService.validateToken(token);
    return this.authService.getProfile(user.id);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Token successfully refreshed' })
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
} 