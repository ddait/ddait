import { Controller, Get, Headers, UnauthorizedException, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  async getProfile(@Headers('authorization') token: string) {
    if (!token || !token.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token format');
    }

    const tokenValue = token.split(' ')[1];
    const user = await this.authService.validateToken(tokenValue);
    
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return this.authService.getProfile(user.id);
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('validate')
  async validateToken(@Body('token') token: string) {
    const result = await this.authService.validateToken(token);
    if (!result.valid) {
      throw new UnauthorizedException();
    }
    return result;
  }
} 