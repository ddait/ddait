import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MobileBffModule } from '../mobile-bff.module';
import { AuthGuard } from '../../../auth/auth.guard';

describe('Mobile BFF (e2e)', () => {
  let app: INestApplication;
  let mockAuthGuard: jest.Mock;

  beforeEach(async () => {
    mockAuthGuard = jest.fn().mockImplementation((req, res, next) => next());

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MobileBffModule],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: mockAuthGuard })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Auth Controller', () => {
    it('/mobile/auth/signup (POST)', () => {
      return request(app.getHttpServer())
        .post('/mobile/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('id');
          expect(res.body.data).toHaveProperty('email');
        });
    });

    it('/mobile/auth/login (POST)', () => {
      return request(app.getHttpServer())
        .post('/mobile/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('token');
          expect(res.body.data).toHaveProperty('user');
        });
    });
  });

  describe('Exercise Controller', () => {
    it('/mobile/exercise/sessions (POST)', () => {
      return request(app.getHttpServer())
        .post('/mobile/exercise/sessions')
        .send({
          type: 'running',
          duration: 1800
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('id');
          expect(res.body.data).toHaveProperty('type');
        });
    });

    it('/mobile/exercise/sessions/:id (GET)', () => {
      return request(app.getHttpServer())
        .get('/mobile/exercise/sessions/test-id')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('id');
          expect(res.body.data).toHaveProperty('type');
        });
    });
  });

  describe('Competition Controller', () => {
    it('/mobile/competition/match (POST)', () => {
      return request(app.getHttpServer())
        .post('/mobile/competition/match')
        .send({
          type: '1v1',
          exerciseType: 'running'
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('matchId');
          expect(res.body.data).toHaveProperty('status');
        });
    });

    it('/mobile/competition/leaderboard (GET)', () => {
      return request(app.getHttpServer())
        .get('/mobile/competition/leaderboard')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('rankings');
          expect(res.body.data).toHaveProperty('meta');
        });
    });
  });

  describe('Social Controller', () => {
    it('/mobile/social/friends (GET)', () => {
      return request(app.getHttpServer())
        .get('/mobile/social/friends')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('friends');
          expect(res.body.data).toHaveProperty('meta');
        });
    });

    it('/mobile/social/feed (GET)', () => {
      return request(app.getHttpServer())
        .get('/mobile/social/feed')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('posts');
          expect(res.body.data).toHaveProperty('meta');
        });
    });
  });
}); 