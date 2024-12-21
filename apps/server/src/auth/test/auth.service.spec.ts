import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { MockService } from '../../mock/mock.service';
import { SignUpDto, SignInDto } from '../dto/auth.dto';
import { UnauthorizedException } from '@nestjs/common';
import { MockModule } from '../../mock/mock.module';

describe('AuthService', () => {
  let service: AuthService;
  let mockService: MockService;

  const mockUser = {
    id: 'test-id',
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
    avatarUrl: 'https://example.com/avatar.jpg',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockModule],
      providers: [
        AuthService,
        {
          provide: MockService,
          useValue: {
            createMockUser: jest.fn().mockResolvedValue({
              id: mockUser.id,
              email: mockUser.email,
              name: mockUser.name,
              avatarUrl: mockUser.avatarUrl,
            }),
            generateMockTokens: jest.fn().mockResolvedValue({
              accessToken: 'test-token',
              refreshToken: 'refresh-token',
            }),
            validateMockToken: jest.fn().mockImplementation((token) => {
              if (token === 'test-token') {
                return Promise.resolve({ valid: true, id: mockUser.id });
              }
              return Promise.resolve({ valid: false, id: null });
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    mockService = module.get<MockService>(MockService);
  });

  describe('signUp', () => {
    it('should create a new user', async () => {
      const signUpDto: SignUpDto = {
        email: mockUser.email,
        password: mockUser.password,
        name: mockUser.name,
      };

      const result = await service.signUp(signUpDto);

      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        avatarUrl: mockUser.avatarUrl,
      });
    });
  });

  describe('signIn', () => {
    it('should authenticate user and return token', async () => {
      const signInDto: SignInDto = {
        email: mockUser.email,
        password: mockUser.password,
      };

      const result = await service.signIn(signInDto);

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
    });
  });

  describe('validateToken', () => {
    it('should return user data when token is valid', async () => {
      const result = await service.validateToken('test-token');

      expect(result).toEqual({
        valid: true,
        id: mockUser.id,
      });
    });

    it('should throw UnauthorizedException when token is invalid', async () => {
      await expect(service.validateToken('invalid-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
}); 