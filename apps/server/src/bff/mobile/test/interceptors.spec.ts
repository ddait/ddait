import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TestController } from './test.controller';
import { MobileBatteryOptimizationInterceptor } from '../interceptors/battery-optimization.interceptor';
import { MobileResponseInterceptor } from '../interceptors/response.interceptor';

describe('Mobile BFF Interceptors', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(
      new MobileBatteryOptimizationInterceptor(),
      new MobileResponseInterceptor()
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('배터리 최적화 인터셉터', () => {
    it('배터리 레벨이 20% 이하일 때 최적화가 적용되어야 함', () => {
      return request(app.getHttpServer())
        .get('/test/success')
        .set('x-battery-level', '15')
        .expect(200)
        .expect(res => {
          expect(res.header['x-battery-optimization-applied']).toBe('true');
        });
    });

    it('배터리 레벨이 20% 초과일 때 최적화가 적용되지 않아야 함', () => {
      return request(app.getHttpServer())
        .get('/test/success')
        .set('x-battery-level', '80')
        .expect(200)
        .expect(res => {
          expect(res.header['x-battery-optimization-applied']).toBeUndefined();
        });
    });
  });

  describe('응답 인터셉터', () => {
    it('성공 응답이 올바른 형식으로 변환되어야 함', () => {
      return request(app.getHttpServer())
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
      return request(app.getHttpServer())
        .get('/test/error')
        .expect(500)
        .expect(res => {
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toHaveProperty('message');
          expect(res.body.error).toHaveProperty('statusCode', 500);
        });
    });
  });
}); 