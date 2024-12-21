import { Module } from '@nestjs/common';
import { MobileAuthController } from './controllers/auth.controller';
import { MobileExerciseController } from './controllers/exercise.controller';
import { MobileCompetitionController } from './controllers/competition.controller';
import { MobileSocialController } from './controllers/social.controller';
import { MobileResponseInterceptor } from './interceptors/response.interceptor';
import { MobileErrorFilter } from './filters/error.filter';
import { MobileCacheInterceptor } from './interceptors/cache.interceptor';
import { MobileRateLimitInterceptor } from './interceptors/rate-limit.interceptor';

@Module({
  controllers: [
    MobileAuthController,
    MobileExerciseController,
    MobileCompetitionController,
    MobileSocialController,
  ],
  providers: [
    MobileResponseInterceptor,
    MobileErrorFilter,
    MobileCacheInterceptor,
    MobileRateLimitInterceptor,
  ],
})
export class MobileBFFModule {} 