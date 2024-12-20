import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    signUp: jest.fn(),
    signIn: jest.fn(),
    signInWithGoogle: jest.fn(),
    signOut: jest.fn(),
    resetPassword: jest.fn(),
    updatePassword: jest.fn(),
    getUser: jest.fn(),
    refreshToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('should create a new user', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'Test123!@#',
        username: 'testuser',
      };

      const expectedResponse = {
        user: {
          id: 'test-id',
          email: mockUser.email,
        },
        session: null,
      };

      mockAuthService.signUp.mockResolvedValue(expectedResponse);

      const result = await controller.signUp(
        mockUser.email,
        mockUser.password,
        mockUser.username,
      );

      expect(result).toEqual(expectedResponse);
      expect(mockAuthService.signUp).toHaveBeenCalledWith(
        mockUser.email,
        mockUser.password,
        mockUser.username,
      );
    });

    it('should throw UnauthorizedException on signup failure', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'Test123!@#',
        username: 'testuser',
      };

      mockAuthService.signUp.mockRejectedValue(new UnauthorizedException());

      await expect(
        controller.signUp(mockUser.email, mockUser.password, mockUser.username),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('signIn', () => {
    it('should sign in a user', async () => {
      const mockCredentials = {
        email: 'test@example.com',
        password: 'Test123!@#',
      };

      const expectedResponse = {
        user: {
          id: 'test-id',
          email: mockCredentials.email,
        },
        session: {
          access_token: 'test-token',
        },
      };

      mockAuthService.signIn.mockResolvedValue(expectedResponse);

      const result = await controller.signIn(
        mockCredentials.email,
        mockCredentials.password,
      );

      expect(result).toEqual(expectedResponse);
      expect(mockAuthService.signIn).toHaveBeenCalledWith(
        mockCredentials.email,
        mockCredentials.password,
      );
    });

    it('should throw UnauthorizedException on invalid credentials', async () => {
      const mockCredentials = {
        email: 'test@example.com',
        password: 'wrong-password',
      };

      mockAuthService.signIn.mockRejectedValue(new UnauthorizedException());

      await expect(
        controller.signIn(mockCredentials.email, mockCredentials.password),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getUser', () => {
    it('should return user data for valid token', async () => {
      const mockToken = 'valid-token';
      const expectedUser = {
        id: 'test-id',
        email: 'test@example.com',
      };

      mockAuthService.getUser.mockResolvedValue(expectedUser);

      const result = await controller.getUser(mockToken);

      expect(result).toEqual(expectedUser);
      expect(mockAuthService.getUser).toHaveBeenCalledWith(mockToken);
    });

    it('should throw UnauthorizedException for invalid token', async () => {
      const mockToken = 'invalid-token';

      mockAuthService.getUser.mockRejectedValue(new UnauthorizedException());

      await expect(controller.getUser(mockToken)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
}); 