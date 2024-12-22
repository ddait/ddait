export type RealtimeEventType = 
  | 'EXERCISE_UPDATE'
  | 'COMPETITION_UPDATE'
  | 'MATCH_FOUND'
  | 'SCORE_UPDATE';

export interface RealtimeEventPayload {
  type: RealtimeEventType;
  data: Record<string, any>;
  timestamp: number;
  userId?: string;
}

export interface EventHandlerConfig {
  retryAttempts?: number;
  retryDelay?: number;
  timeout?: number;
}

export interface EventHandlerResult {
  success: boolean;
  error?: Error;
  metadata?: Record<string, any>;
} 