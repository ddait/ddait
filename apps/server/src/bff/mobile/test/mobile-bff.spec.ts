import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MobileBffModule } from '../mobile-bff.module';
import { ConfigModule } from '@nestjs/config';
import mobileBffConfig from '../config/mobile-bff.config';

describe('MobileBFF (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [mobileBffConfig],
          envFilePath: '.env.mobile',
        }),
        MobileBffModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Response Optimization', () => {
    it('should optimize response data structure', () => {
      const testData = {
        id: 1,
        name: 'Test User',
        createdAt: new Date(),
        metadata: { internal: true },
        _id: 'internal_id',
      };

      return request(app.getHttpServer())
        .post('/test/response')
        .send(testData)
        .expect(200)
        .expect(res => {
          expect(res.body.data).toBeDefined();
          expect(res.body.meta).toBeDefined();
          expect(res.body.meta.timestamp).toBeDefined();
          expect(res.body.data._id).toBeUndefined();
          expect(res.body.data.metadata).toBeUndefined();
        });
    });
  });

  describe('Cache Optimization', () => {
    it('should cache responses and return cached data', async () => {
      const endpoint = '/test/cache';
      
      // First request
      const response1 = await request(app.getHttpServer())
        .get(endpoint)
        .expect(200);

      // Second request to same endpoint
      const response2 = await request(app.getHttpServer())
        .get(endpoint)
        .expect(200);

      expect(response1.body).toEqual(response2.body);
      expect(response2.headers['x-cache-hit']).toBe('true');
    });
  });

  describe('Battery Optimization', () => {
    it('should apply battery optimizations based on battery level', async () => {
      const endpoint = '/test/battery';
      const batteryLevel = 15;

      const response = await request(app.getHttpServer())
        .get(endpoint)
        .set('x-battery-level', batteryLevel.toString())
        .expect(200);

      expect(response.body.data.animations).toBe(false);
      expect(response.body.data.pollingInterval).toBeGreaterThan(1000);
    });
  });

  describe('Network Optimization', () => {
    it('should apply network optimizations based on network type', async () => {
      const endpoint = '/test/network';
      
      const response = await request(app.getHttpServer())
        .get(endpoint)
        .set('x-network-type', 'cellular')
        .set('x-network-effective-type', 'slow-2g')
        .expect(200);

      expect(response.headers['content-encoding']).toBe('gzip');
      expect(response.body.data.length).toBeLessThanOrEqual(10); // Pagination applied
    });
  });

  describe('Error Handling', () => {
    it('should format errors according to mobile BFF standards', () => {
      return request(app.getHttpServer())
        .get('/test/error')
        .expect(400)
        .expect(res => {
          expect(res.body.error).toBeDefined();
          expect(res.body.error.code).toBeDefined();
          expect(res.body.error.message).toBeDefined();
          expect(res.body.error.timestamp).toBeDefined();
        });
    });
  });

  describe('Security', () => {
    it('should apply rate limiting', async () => {
      const endpoint = '/test/ratelimit';
      const requests = Array(101).fill(null); // Exceed rate limit (100)

      for (const _ of requests) {
        const response = await request(app.getHttpServer())
          .get(endpoint);
        
        if (response.status === 429) {
          expect(response.body.error.code).toBe('RATE_LIMIT_EXCEEDED');
          return;
        }
      }

      fail('Rate limit was not enforced');
    });
  });
}); 