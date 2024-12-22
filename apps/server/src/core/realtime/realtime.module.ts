import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RealtimeService } from './realtime.service';
import { EventHandlerService } from './event-handler.service';
import { ConnectionManagerService } from './connection-manager.service';

@Module({
  imports: [ConfigModule],
  providers: [
    RealtimeService,
    EventHandlerService,
    ConnectionManagerService
  ],
  exports: [
    RealtimeService,
    EventHandlerService,
    ConnectionManagerService
  ]
})
export class RealtimeModule {} 