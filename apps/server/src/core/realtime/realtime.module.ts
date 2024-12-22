import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RealtimeService } from './realtime.service';
import { EventHandlerService } from './event-handler.service';

@Module({
  imports: [ConfigModule],
  providers: [RealtimeService, EventHandlerService],
  exports: [RealtimeService, EventHandlerService]
})
export class RealtimeModule {} 