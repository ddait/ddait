import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { MobileResponseInterceptor } from './interceptors/response.interceptor';
import { MobileCacheInterceptor } from './interceptors/cache.interceptor';
import { MobileBatteryOptimizationInterceptor } from './interceptors/battery.interceptor';
import { MobileNetworkOptimizationInterceptor } from './interceptors/network.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.register({
      ttl: 300, // 기본 TTL: 5분
      max: 100, // 최대 캐시 항목 수
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MobileResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MobileCacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MobileBatteryOptimizationInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MobileNetworkOptimizationInterceptor,
    },
  ],
})
export class MobileBffModule {} 