import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test',
        }),
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Authentication', () => {
    it('/auth/signup (POST)', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'Test123!@#',
          username: 'testuser'
        })
        .expect(201)
        .expect(res => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('id');
          expect(res.body.data).toHaveProperty('email');
        });
    });

    it('/auth/login (POST)', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Test123!@#'
        })
        .expect(200)
        .expect(res => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('token');
          expect(res.body.data).toHaveProperty('user');
        });
    });

    it('/auth/google (GET)', () => {
      return request(app.getHttpServer())
        .get('/auth/google')
        .expect(302)
        .expect('Location', /^https:\/\/accounts\.google\.com/);
    });

    it('/auth/profile (GET) - Unauthorized', () => {
      return request(app.getHttpServer())
        .get('/auth/profile')
        .expect(401);
    });

    it('/auth/profile (GET) - Authorized', () => {
      const token = 'valid-test-token'; // 테스트용 토큰
      return request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect(res => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('id');
          expect(res.body.data).toHaveProperty('email');
        });
    });

    it('/auth/logout (POST)', () => {
      const token = 'valid-test-token'; // 테스트용 토큰
      return request(app.getHttpServer())
        .post('/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect(res => {
          expect(res.body.success).toBe(true);
          expect(res.body.message).toBe('Successfully logged out');
        });
    });

    it('/auth/refresh (POST)', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send({
          refreshToken: 'valid-refresh-token'
        })
        .expect(200)
        .expect(res => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('token');
        });
    });

    it('/auth/password/reset (POST)', () => {
      return request(app.getHttpServer())
        .post('/auth/password/reset')
        .send({
          email: 'test@example.com'
        })
        .expect(200)
        .expect(res => {
          expect(res.body.success).toBe(true);
          expect(res.body.message).toBe('Password reset email sent');
        });
    });

    it('/auth/password/update (POST) - Unauthorized', () => {
      return request(app.getHttpServer())
        .post('/auth/password/update')
        .send({
          currentPassword: 'Test123!@#',
          newPassword: 'NewTest123!@#'
        })
        .expect(401);
    });
  });
}); 