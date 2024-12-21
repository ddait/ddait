import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TestModule } from './test.module';
import { MobileResponseInterceptor } from '../interceptors/response.interceptor';
import { MobileCacheInterceptor } from '../interceptors/cache.interceptor';
import { MobileBatteryOptimizationInterceptor } from '../interceptors/battery.interceptor';
import { MobileNetworkOptimizationInterceptor } from '../interceptors/network.interceptor';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('Mobile BFF Interceptors (e2e)', () => {
  let app: INestApplication;
  let cacheManager: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    cacheManager = app.get(CACHE_MANAGER);
    
    app.useGlobalInterceptors(
      new MobileResponseInterceptor(),
      new MobileCacheInterceptor(cacheManager),
      new MobileBatteryOptimizationInterceptor(),
      new MobileNetworkOptimizationInterceptor(),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Response Interceptor', () => {
    it('should transform successful response', () => {
      return request(app.getHttpServer())
        .get('/mobile/test')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('timestamp');
          expect(res.body).toHaveProperty('version');
        });
    });

    it('should transform error response', () => {
      return request(app.getHttpServer())
        .get('/mobile/test/error')
        .expect(500)
        .expect((res) => {
          expect(res.body).toHaveProperty('error');
          expect(res.body).toHaveProperty('timestamp');
          expect(res.body).toHaveProperty('version');
        });
    });
  });

  describe('Cache Interceptor', () => {
    it('should cache successful response', async () => {
      const firstResponse = await request(app.getHttpServer())
        .get('/mobile/test/cached')
        .expect(200);

      const secondResponse = await request(app.getHttpServer())
        .get('/mobile/test/cached')
        .expect(200);

      expect(firstResponse.body.data).toBe(secondResponse.body.data);
      expect(secondResponse.headers['x-cache-hit']).toBe('true');
    });
  });

  describe('Battery Optimization Interceptor', () => {
    it('should apply optimizations for low battery', () => {
      return request(app.getHttpServer())
        .get('/mobile/test')
        .set('x-battery-level', '15')
        .expect(200)
        .expect((res) => {
          expect(res.headers['x-battery-optimized']).toBe('true');
        });
    });

    it('should not apply optimizations for high battery', () => {
      return request(app.getHttpServer())
        .get('/mobile/test')
        .set('x-battery-level', '85')
        .expect(200)
        .expect((res) => {
          expect(res.headers['x-battery-optimized']).toBe('false');
        });
    });
  });

  describe('Network Optimization Interceptor', () => {
    it('should apply optimizations for slow network', () => {
      return request(app.getHttpServer())
        .get('/mobile/test')
        .set('x-network-type', '3g')
        .expect(200)
        .expect((res) => {
          expect(res.headers['x-network-optimized']).toBe('true');
        });
    });

    it('should not apply optimizations for fast network', () => {
      return request(app.getHttpServer())
        .get('/mobile/test')
        .set('x-network-type', '5g')
        .expect(200)
        .expect((res) => {
          expect(res.headers['x-network-optimized']).toBe('false');
        });
    });
  });

  describe('Interceptors Integration', () => {
    it('should apply all optimizations in correct order', () => {
      return request(app.getHttpServer())
        .get('/mobile/test')
        .set('x-battery-level', '15')
        .set('x-network-type', '3g')
        .expect(200)
        .expect((res) => {
          expect(res.headers['x-battery-optimized']).toBe('true');
          expect(res.headers['x-network-optimized']).toBe('true');
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('timestamp');
          expect(res.body).toHaveProperty('version');
        });
    });

    it('should handle concurrent requests correctly', async () => {
      const requests = Array(5).fill(null).map(() => 
        request(app.getHttpServer()).get('/mobile/test')
      );

      const responses = await Promise.all(requests);

      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('timestamp');
        expect(response.body).toHaveProperty('version');
      });
    });
  });
}); 