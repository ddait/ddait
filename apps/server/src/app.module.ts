import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MobileBffModule } from './bff/mobile/mobile-bff.module';
import mobileBffConfig from './bff/mobile/config/mobile-bff.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mobileBffConfig],
      envFilePath: ['.env.mobile', '.env'],
    }),
    MobileBffModule,
  ],
})
export class AppModule {}
