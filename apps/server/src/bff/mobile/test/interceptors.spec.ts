import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { MobileResponseInterceptor } from '../interceptors/response.interceptor';
import { TestController } from './test.controller';

describe('Mobile BFF Interceptors', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new MobileResponseInterceptor());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('응답 인터셉터', () => {
    it('성공 응답이 올바른 형식으로 변환되어야 함', () => {
      return supertest(app.getHttpServer())
        .get('/test/success')
        .expect(200)
        .expect(res => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('meta');
          expect(res.body.meta).toHaveProperty('timestamp');
          expect(res.body.meta).toHaveProperty('version', '1.0');
        });
    });

    it('에러 응답이 올바른 형식으로 변환되어야 함', () => {
      return supertest(app.getHttpServer())
        .get('/test/error')
        .expect(500)
        .expect(res => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toHaveProperty('message');
          expect(res.body.error).toHaveProperty('statusCode', 500);
          expect(res.body).toHaveProperty('meta');
          expect(res.body.meta).toHaveProperty('timestamp');
          expect(res.body.meta).toHaveProperty('version', '1.0');
        });
    });
  });
}); 