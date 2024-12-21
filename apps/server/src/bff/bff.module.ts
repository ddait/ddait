import { Module } from '@nestjs/common';
import { MobileBffModule } from './mobile/mobile-bff.module';

@Module({
  imports: [MobileBffModule],
})
export class BffModule {} 