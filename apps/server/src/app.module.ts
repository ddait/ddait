import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ExerciseModule } from './exercise/exercise.module';
import { CompetitionModule } from './competition/competition.module';
import { SupabaseModule } from './supabase/supabase.module';
import { MockModule } from './mock/mock.module';
import { SocialModule } from './social/social.module';
import { MobileBffModule } from './bff/mobile/mobile-bff.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule,
    MockModule,
    AuthModule,
    ExerciseModule,
    CompetitionModule,
    SocialModule,
    MobileBffModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
