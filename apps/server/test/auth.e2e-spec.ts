import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ConfigService } from '@nestjs/config';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let configService: ConfigService;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configService = moduleFixture.get<ConfigService>(ConfigService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Authentication Flow', () => {
    const testUser = {
      email: 'e2e-test@example.com',
      password: 'Test123!@#',
      username: 'e2etester'
    };

    it('/auth/signup (POST) - should create new user', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(testUser)
        .expect(201)
        .expect((res) => {
          expect(res.body.user).toBeDefined();
          expect(res.body.user.email).toBe(testUser.email);
        });
    });

    it('/auth/signin (POST) - should authenticate user', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.session).toBeDefined();
          expect(res.body.session.access_token).toBeDefined();
          jwtToken = res.body.session.access_token;
        });
    });

    it('/auth/user (GET) - should get user profile with valid token', () => {
      return request(app.getHttpServer())
        .get('/auth/user')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.email).toBe(testUser.email);
        });
    });

    it('/auth/user (GET) - should reject invalid token', () => {
      return request(app.getHttpServer())
        .get('/auth/user')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });

    it('/auth/signout (POST) - should sign out user', () => {
      return request(app.getHttpServer())
        .post('/auth/signout')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(201)
        .expect((res) => {
          expect(res.body.message).toBe('Successfully signed out');
        });
    });

    it('/auth/reset-password (POST) - should send reset password email', () => {
      return request(app.getHttpServer())
        .post('/auth/reset-password')
        .send({ email: testUser.email })
        .expect(201)
        .expect((res) => {
          expect(res.body.message).toBe('Password reset email sent');
        });
    });
  });

  describe('Rate Limiting', () => {
    it('should block too many login attempts', async () => {
      const attempts = Array(6).fill({
        email: 'test@example.com',
        password: 'wrongpassword'
      });

      for (let i = 0; i < 5; i++) {
        await request(app.getHttpServer())
          .post('/auth/signin')
          .send(attempts[i])
          .expect(401);
      }

      // 6th attempt should be blocked
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send(attempts[5])
        .expect(429);
    });
  });

  describe('Security Headers', () => {
    it('should include security headers in response', () => {
      return request(app.getHttpServer())
        .get('/auth/user')
        .expect((res) => {
          expect(res.headers['x-frame-options']).toBe('DENY');
          expect(res.headers['x-xss-protection']).toBe('1; mode=block');
          expect(res.headers['x-content-type-options']).toBe('nosniff');
        });
    });
  });
}); 