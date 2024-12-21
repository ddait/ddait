import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { SignUpDto, SignInDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async signUp(signUpDto: SignUpDto) {
    const { data, error } = await this.supabaseService.auth.signUp({
      email: signUpDto.email,
      password: signUpDto.password,
      options: {
        data: {
          username: signUpDto.username,
        },
      },
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return data;
  }

  async signIn(signInDto: SignInDto) {
    const { data, error } = await this.supabaseService.auth.signInWithPassword({
      email: signInDto.email,
      password: signInDto.password,
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return data;
  }

  async signOut(userId: string) {
    const { error } = await this.supabaseService.auth.signOut();

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return { message: 'Successfully signed out' };
  }

  async resetPassword(email: string) {
    const { error } = await this.supabaseService.auth.resetPasswordForEmail(email);

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return { message: 'Password reset email sent' };
  }

  async updatePassword(userId: string, currentPassword: string, newPassword: string) {
    // First get user email
    const { data: userData, error: userError } = await this.supabaseService
      .from('profiles')
      .select('email')
      .eq('id', userId)
      .single();

    if (userError || !userData) {
      throw new UnauthorizedException('User not found');
    }

    // Verify current password
    const { data: { user }, error: verifyError } = await this.supabaseService.auth.signInWithPassword({
      email: userData.email,
      password: currentPassword,
    });

    if (verifyError || user.id !== userId) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Update password
    const { error } = await this.supabaseService.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return { message: 'Password updated successfully' };
  }

  async validateToken(token: string) {
    const { data: { user }, error } = await this.supabaseService.auth.getUser(token);

    if (error || !user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }

  async getProfile(userId: string) {
    const { data, error } = await this.supabaseService
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return data;
  }

  async refreshToken(refreshToken: string) {
    const { data, error } = await this.supabaseService.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return data;
  }
} 