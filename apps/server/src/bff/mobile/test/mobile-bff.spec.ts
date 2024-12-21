import { Test, TestingModule } from '@nestjs/testing';
import { MobileBffController } from '../mobile-bff.controller';
import { MobileBffService } from '../mobile-bff.service';
import { ConfigService } from '@nestjs/config';
import { MobileResponseInterceptor } from '../interceptors/response.interceptor';
import { MobileCacheInterceptor } from '../interceptors/cache.interceptor';
import { MobileBatteryOptimizationInterceptor } from '../interceptors/battery-optimization.interceptor';
import { MobileNetworkOptimizationInterceptor } from '../interceptors/network-optimization.interceptor';
import { testConfig } from '../../../test/test-config';
import { map } from 'rxjs/operators';

describe('MobileBffController', () => {
  let controller: MobileBffController;
  let service: MobileBffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MobileBffController],
      providers: [
        MobileBffService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              return testConfig[key];
            }),
          },
        },
      ],
    })
      .overrideInterceptor(MobileResponseInterceptor)
      .useValue({
        intercept: jest.fn().mockImplementation((context, next) => {
          return next.handle().pipe(
            map((data) => ({
              success: true,
              data,
              metadata: {
                timestamp: expect.any(Number),
                version: '1.0.0',
              },
            })),
          );
        }),
      })
      .overrideInterceptor(MobileCacheInterceptor)
      .useValue({
        intercept: jest.fn().mockImplementation((context, next) => next.handle()),
      })
      .overrideInterceptor(MobileBatteryOptimizationInterceptor)
      .useValue({
        intercept: jest.fn().mockImplementation((context, next) => next.handle()),
      })
      .overrideInterceptor(MobileNetworkOptimizationInterceptor)
      .useValue({
        intercept: jest.fn().mockImplementation((context, next) => next.handle()),
      })
      .compile();

    controller = module.get<MobileBffController>(MobileBffController);
    service = module.get<MobileBffService>(MobileBffService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getHealth', () => {
    it('should return health status', async () => {
      const result = await controller.getHealth();
      expect(result).toEqual({
        status: 'ok',
        timestamp: expect.any(Number),
      });
    });
  });
}); 