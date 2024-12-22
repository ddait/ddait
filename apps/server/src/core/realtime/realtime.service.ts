import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ExerciseUpdate, CompetitionUpdate } from './types/realtime.types';

@Injectable()
export class RealtimeService implements OnModuleInit {
  private readonly logger = new Logger(RealtimeService.name);
  private supabase: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
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
    const exerciseChannel = this.supabase
      .channel('exercise_updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'exercise_sessions'
      }, (payload) => {
        this.handleExerciseUpdate(payload);
      });

    const competitionChannel = this.supabase
      .channel('competition_updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'competitions'
      }, (payload) => {
        this.handleCompetitionUpdate(payload);
      });

    await exerciseChannel.subscribe();
    await competitionChannel.subscribe();
  }

  private handleExerciseUpdate(payload: any) {
    this.logger.debug('Exercise update received', payload);
  }

  private handleCompetitionUpdate(payload: any) {
    this.logger.debug('Competition update received', payload);
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
} 