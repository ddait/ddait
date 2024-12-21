import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MobileAuthController } from './controllers/auth.controller';
import { MobileExerciseController } from './controllers/exercise.controller';
import { MobileCompetitionController } from './controllers/competition.controller';
import { MobileSocialController } from './controllers/social.controller';
import { MobileResponseInterceptor } from './interceptors/response.interceptor';
import { MobileCacheInterceptor } from './interceptors/cache.interceptor';
import { MobileBatteryOptimizationInterceptor } from './interceptors/battery.interceptor';
import { MobileNetworkOptimizationInterceptor } from './interceptors/network.interceptor';
import { MobileErrorFilter } from './filters/error.filter';
import { AuthModule } from '../../auth/auth.module';
import { ExerciseModule } from '../../exercise/exercise.module';
import { CompetitionModule } from '../../competition/competition.module';
import { SocialModule } from '../../social/social.module';

@Module({
  imports: [
    AuthModule,
    ExerciseModule,
    CompetitionModule,
    SocialModule,
    CacheModule.register({
      ttl: 60, // Time to live in seconds
      max: 100, // Maximum number of items in cache
    }),
  ],
  controllers: [
    MobileAuthController,
    MobileExerciseController,
    MobileCompetitionController,
    MobileSocialController,
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
    MobileErrorFilter,
  ],
})
export class MobileBffModule {} 