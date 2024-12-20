import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL'),
      this.configService.get<string>('SUPABASE_ANON_KEY')
    );
  }

  async signUp(email: string, password: string, username: string) {
    const { data: authData, error: authError } = await this.supabase.auth.signUp({
      email,
      password
    });

    if (authError) {
      throw new UnauthorizedException(authError.message);
    }

    // Create profile after successful signup
    const { error: profileError } = await this.supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          username,
          email: authData.user.email
        }
      ]);

    if (profileError) {
      // Rollback auth user creation if profile creation fails
      await this.supabase.auth.admin.deleteUser(authData.user.id);
      throw new UnauthorizedException('Failed to create user profile');
    }

    return authData;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return data;
  }

  async signInWithGoogle() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google'
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return data;
  }

  async signOut(token: string) {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return { message: 'Successfully signed out' };
  }

  async resetPassword(email: string) {
    const { error } = await this.supabase.auth.resetPasswordForEmail(email);

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return { message: 'Password reset email sent' };
  }

  async updatePassword(newPassword: string) {
    const { error } = await this.supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return { message: 'Password updated successfully' };
  }

  async getUser(token: string) {
    const { data: { user }, error } = await this.supabase.auth.getUser(token);

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return user;
  }

  async refreshToken(refreshToken: string) {
    const { data, error } = await this.supabase.auth.refreshSession();

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return data;
  }
} 