import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ExerciseUpdate, CompetitionUpdate } from './types/realtime.types';
import { ConnectionManagerService } from './connection-manager.service';

@Injectable()
export class RealtimeService implements OnModuleInit {
  private readonly logger = new Logger(RealtimeService.name);
  private supabase: SupabaseClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly connectionManager: ConnectionManagerService
  ) {
    this.supabase = createClient(
      this.configService.getOrThrow('SUPABASE_URL'),
      this.configService.getOrThrow('SUPABASE_SERVICE_KEY')
    );
  }

  async onModuleInit() {
    try {
      await this.setupRealtimeChannels();
      this.logger.log('Realtime channels initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize realtime channels', error);
      throw error;
    }
  }

  private async setupRealtimeChannels() {
    // 운동 세션 채널 설정
    await this.connectionManager.createChannel('exercise_updates', {
      table: 'exercise_sessions',
      events: ['*']
    });

    // 경쟁 채널 설정
    await this.connectionManager.createChannel('competition_updates', {
      table: 'competitions',
      events: ['*']
    });
  }

  async broadcastExerciseUpdate(sessionId: string, data: ExerciseUpdate) {
    try {
      await this.supabase
        .from('exercise_sessions')
        .update(data)
        .eq('id', sessionId);
    } catch (error) {
      this.logger.error(`Failed to broadcast exercise update for session ${sessionId}`, error);
      throw error;
    }
  }

  async broadcastCompetitionUpdate(competitionId: string, data: CompetitionUpdate) {
    try {
      await this.supabase
        .from('competitions')
        .update(data)
        .eq('id', competitionId);
    } catch (error) {
      this.logger.error(`Failed to broadcast competition update for competition ${competitionId}`, error);
      throw error;
    }
  }

  // 채널 관리 메서드
  async createCustomChannel(channelName: string, config: any) {
    return this.connectionManager.createChannel(channelName, config);
  }

  async removeChannel(channelName: string) {
    await this.connectionManager.removeChannel(channelName);
  }

  getActiveChannels() {
    return this.connectionManager.getActiveChannels();
  }

  async cleanup() {
    await this.connectionManager.closeAllChannels();
  }
} 