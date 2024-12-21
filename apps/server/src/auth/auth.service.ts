import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto, SignInDto } from './dto/auth.dto';
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
} 