import { Injectable, Logger } from '@nestjs/common';
import { RealtimeService } from './realtime.service';
import { 
  RealtimeEventPayload, 
  RealtimeEventType, 
  EventHandlerConfig,
  EventHandlerResult 
} from './types/event-handler.types';
import { ExerciseUpdate, CompetitionUpdate } from './types/realtime.types';
import { isValidExerciseUpdate, isValidCompetitionUpdate } from './utils/type-guards';

@Injectable()
export class EventHandlerService {
  private readonly logger = new Logger(EventHandlerService.name);
  private readonly defaultConfig: EventHandlerConfig = {
    retryAttempts: 3,
    retryDelay: 1000,
    timeout: 5000
  };

  constructor(private readonly realtimeService: RealtimeService) {}

  async handleEvent(
    event: RealtimeEventPayload,
    config: EventHandlerConfig = this.defaultConfig
  ): Promise<EventHandlerResult> {
    try {
      this.logger.debug(`Handling event: ${event.type}`);

      switch (event.type) {
        case 'EXERCISE_UPDATE':
          return await this.handleExerciseUpdate(event);
        case 'COMPETITION_UPDATE':
          return await this.handleCompetitionUpdate(event);
        case 'MATCH_FOUND':
          return await this.handleMatchFound(event);
        case 'SCORE_UPDATE':
          return await this.handleScoreUpdate(event);
        default:
          throw new Error(`Unknown event type: ${event.type}`);
      }
    } catch (error) {
      this.logger.error(`Error handling event ${event.type}:`, error);
      if (config.retryAttempts > 0) {
        return this.retryHandler(event, {
          ...config,
          retryAttempts: config.retryAttempts - 1
        });
      }
      return { success: false, error };
    }
  }

  private async retryHandler(
    event: RealtimeEventPayload,
    config: EventHandlerConfig
  ): Promise<EventHandlerResult> {
    this.logger.debug(`Retrying event ${event.type}. Attempts left: ${config.retryAttempts}`);
    await new Promise(resolve => setTimeout(resolve, config.retryDelay));
    return this.handleEvent(event, config);
  }

  private async handleExerciseUpdate(
    event: RealtimeEventPayload
  ): Promise<EventHandlerResult> {
    try {
      const { sessionId, ...rawData } = event.data;
      
      // 데이터 변환 및 유효성 검증
      const exerciseData: ExerciseUpdate = {
        sessionId,
        status: rawData.status as 'active' | 'paused' | 'completed',
        currentDuration: Number(rawData.currentDuration),
        calories: Number(rawData.calories),
        metadata: rawData.metadata
      };

      if (!isValidExerciseUpdate(exerciseData)) {
        throw new Error('Invalid exercise update data format');
      }

      await this.realtimeService.broadcastExerciseUpdate(sessionId, exerciseData);
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to handle exercise update: ${error.message}`);
    }
  }

  private async handleCompetitionUpdate(
    event: RealtimeEventPayload
  ): Promise<EventHandlerResult> {
    try {
      const { competitionId, ...rawData } = event.data;
      
      // 데이터 변환 및 유효성 검증
      const competitionData: CompetitionUpdate = {
        competitionId,
        status: rawData.status as 'waiting' | 'active' | 'completed',
        currentParticipants: Number(rawData.currentParticipants),
        scores: rawData.scores as Record<string, number>,
        metadata: rawData.metadata
      };

      if (!isValidCompetitionUpdate(competitionData)) {
        throw new Error('Invalid competition update data format');
      }

      await this.realtimeService.broadcastCompetitionUpdate(competitionId, competitionData);
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to handle competition update: ${error.message}`);
    }
  }

  private async handleMatchFound(
    event: RealtimeEventPayload
  ): Promise<EventHandlerResult> {
    try {
      // TODO: Implement match found logic
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to handle match found: ${error.message}`);
    }
  }

  private async handleScoreUpdate(
    event: RealtimeEventPayload
  ): Promise<EventHandlerResult> {
    try {
      // TODO: Implement score update logic
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to handle score update: ${error.message}`);
    }
  }
} 