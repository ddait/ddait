import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { RateLimiterMemory } from 'rate-limiter-flexible';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private supabase;
  private rateLimiter;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL'),
      this.configService.get<string>('SUPABASE_ANON_KEY')
    );

    // Rate limiter: 5 attempts per minute
    this.rateLimiter = new RateLimiterMemory({
      points: 5,
      duration: 60,
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    // Add security headers
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

    // Skip rate limiting for non-auth routes
    if (!req.path.startsWith('/auth')) {
      return next();
    }

    try {
      // Rate limiting
      const ip = req.ip;
      await this.rateLimiter.consume(ip);

      // Token validation for protected routes
      if (this.isProtectedRoute(req.path)) {
        const token = this.extractTokenFromHeader(req);
        if (!token) {
          throw new UnauthorizedException('No token provided');
        }

        const { data: { user }, error } = await this.supabase.auth.getUser(token);
        if (error || !user) {
          throw new UnauthorizedException('Invalid token');
        }

        // Add user to request object
        req['user'] = user;
      }

      // Password strength validation for signup/password update
      if (this.isPasswordRoute(req.path) && req.method === 'POST') {
        const { password } = req.body;
        if (!this.isStrongPassword(password)) {
          throw new UnauthorizedException(
            'Password must be at least 8 characters long and contain uppercase, lowercase, number and special character'
          );
        }
      }

      next();
    } catch (error) {
      if (error.name === 'RateLimiterRes') {
        res.status(429).json({
          message: 'Too many attempts, please try again later',
          retryAfter: error.msBeforeNext / 1000,
        });
      } else {
        next(error);
      }
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private isProtectedRoute(path: string): boolean {
    const protectedRoutes = [
      '/auth/user',
      '/auth/signout',
      '/auth/update-password',
    ];
    return protectedRoutes.some(route => path.startsWith(route));
  }

  private isPasswordRoute(path: string): boolean {
    const passwordRoutes = [
      '/auth/signup',
      '/auth/update-password',
    ];
    return passwordRoutes.some(route => path.startsWith(route));
  }

  private isStrongPassword(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  }
} 