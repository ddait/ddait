import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      switch (key) {
        case 'SUPABASE_URL':
          return 'https://test.supabase.co';
        case 'SUPABASE_ANON_KEY':
          return 'test-key';
        default:
          return null;
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should successfully create a new user', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'Test123!@#',
        username: 'testuser'
      };

      jest.spyOn(service['supabase'].auth, 'signUp').mockResolvedValue({
        data: {
          user: {
            id: 'test-id',
            email: mockUser.email,
          },
          session: null,
        },
        error: null,
      } as any);

      jest.spyOn(service['supabase'].from('profiles'), 'insert').mockResolvedValue({
        data: [{ id: 'test-id' }],
        error: null,
      } as any);

      const result = await service.signUp(
        mockUser.email,
        mockUser.password,
        mockUser.username
      );

      expect(result.user.email).toBe(mockUser.email);
    });

    it('should throw UnauthorizedException on auth error', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'Test123!@#',
        username: 'testuser'
      };

      jest.spyOn(service['supabase'].auth, 'signUp').mockResolvedValue({
        data: null,
        error: { message: 'Auth error' },
      } as any);

      await expect(
        service.signUp(mockUser.email, mockUser.password, mockUser.username)
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('signIn', () => {
    it('should successfully sign in a user', async () => {
      const mockCredentials = {
        email: 'test@example.com',
        password: 'Test123!@#'
      };

      jest.spyOn(service['supabase'].auth, 'signInWithPassword').mockResolvedValue({
        data: {
          user: {
            id: 'test-id',
            email: mockCredentials.email,
          },
          session: {
            access_token: 'test-token',
          },
        },
        error: null,
      } as any);

      const result = await service.signIn(
        mockCredentials.email,
        mockCredentials.password
      );

      expect(result.user.email).toBe(mockCredentials.email);
      expect(result.session.access_token).toBe('test-token');
    });

    it('should throw UnauthorizedException on invalid credentials', async () => {
      const mockCredentials = {
        email: 'test@example.com',
        password: 'wrong-password'
      };

      jest.spyOn(service['supabase'].auth, 'signInWithPassword').mockResolvedValue({
        data: null,
        error: { message: 'Invalid credentials' },
      } as any);

      await expect(
        service.signIn(mockCredentials.email, mockCredentials.password)
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getUser', () => {
    it('should return user data for valid token', async () => {
      const mockToken = 'valid-token';
      const mockUser = {
        id: 'test-id',
        email: 'test@example.com'
      };

      jest.spyOn(service['supabase'].auth, 'getUser').mockResolvedValue({
        data: { user: mockUser },
        error: null,
      } as any);

      const result = await service.getUser(mockToken);
      expect(result).toEqual(mockUser);
    });

    it('should throw UnauthorizedException for invalid token', async () => {
      const mockToken = 'invalid-token';

      jest.spyOn(service['supabase'].auth, 'getUser').mockResolvedValue({
        data: { user: null },
        error: { message: 'Invalid token' },
      } as any);

      await expect(service.getUser(mockToken)).rejects.toThrow(UnauthorizedException);
    });
  });
}); 