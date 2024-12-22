export interface RealtimeEvent {
  schema: string;
  table: string;
  commit_timestamp: string;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: Record<string, any>;
  old: Record<string, any>;
}

export interface ExerciseUpdate {
  sessionId: string;
  status: 'active' | 'paused' | 'completed';
  currentDuration: number;
  calories: number;
  metadata?: Record<string, any>;
}

export interface CompetitionUpdate {
  competitionId: string;
  status: 'waiting' | 'active' | 'completed';
  currentParticipants: number;
  scores: Record<string, number>;
  metadata?: Record<string, any>;
} 