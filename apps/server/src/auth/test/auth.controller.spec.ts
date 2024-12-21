import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { SignUpDto, SignInDto } from '../dto/auth.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let module: TestingModule;

  const mockUser = {
    id: 'test-id',
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
    avatarUrl: 'https://example.com/avatar.jpg',
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn().mockResolvedValue({
              id: mockUser.id,
              email: mockUser.email,
              name: mockUser.name,
              avatarUrl: mockUser.avatarUrl,
            }),
            signIn: jest.fn().mockResolvedValue({
              accessToken: 'test-token',
              refreshToken: 'refresh-token',
              user: {
                id: mockUser.id,
                email: mockUser.email,
                name: mockUser.name,
                avatarUrl: mockUser.avatarUrl,
              },
            }),
            validateToken: jest.fn().mockImplementation((token) => {
              if (token === 'test-token') {
                return Promise.resolve({ valid: true, id: mockUser.id });
              }
              return Promise.resolve({ valid: false, id: null });
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('signUp', () => {
    it('should create a new user', async () => {
      const signUpDto: SignUpDto = {
        email: mockUser.email,
        password: mockUser.password,
        name: mockUser.name,
      };

      const result = await controller.signUp(signUpDto);

      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        avatarUrl: mockUser.avatarUrl,
      });
      expect(service.signUp).toHaveBeenCalledWith(signUpDto);
    });
  });

  describe('signIn', () => {
    it('should authenticate user and return token', async () => {
      const signInDto: SignInDto = {
        email: mockUser.email,
        password: mockUser.password,
      };

      const result = await controller.signIn(signInDto);

      expect(result).toEqual({
        accessToken: 'test-token',
        refreshToken: 'refresh-token',
        user: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          avatarUrl: mockUser.avatarUrl,
        },
      });
      expect(service.signIn).toHaveBeenCalledWith(signInDto);
    });
  });

  describe('validateToken', () => {
    it('should return user data when token is valid', async () => {
      const result = await controller.validateToken('test-token');

      expect(result).toEqual({
        valid: true,
        id: mockUser.id,
      });
      expect(service.validateToken).toHaveBeenCalledWith('test-token');
    });

    it('should throw UnauthorizedException when token is invalid', async () => {
      await expect(controller.validateToken('invalid-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
}); 