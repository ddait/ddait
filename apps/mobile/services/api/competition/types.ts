export interface Competition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: 'INDIVIDUAL' | 'TEAM';
  status: 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED';
  participants: Array<{
    userId: string;
    nickname: string;
    score: number;
    rank?: number;
  }>;
  rules: CompetitionRules;
}

export interface CompetitionRules {
  scoringSystem: 'POINTS' | 'TIME' | 'WEIGHT';
  targetExercises: string[]; // Exercise IDs
  minimumSets: number;
  minimumReps?: number;
  minimumDuration?: number; // in seconds
  minimumDistance?: number; // in meters
}

export interface CreateCompetitionRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: 'INDIVIDUAL' | 'TEAM';
  rules: CompetitionRules;
}

export interface JoinCompetitionRequest {
  userId: string;
  teamId?: string; // Required for team competitions
}

export interface SubmitCompetitionResultRequest {
  userId: string;
  workoutSessionId: string;
}

export interface CompetitionLeaderboard {
  competitionId: string;
  rankings: Array<{
    rank: number;
    userId: string;
    nickname: string;
    score: number;
    lastUpdated: string;
  }>;
}

export interface CompetitionError {
  code: 'COMPETITION_NOT_FOUND' | 'INVALID_COMPETITION_DATA' | 'ALREADY_JOINED' | 'INVALID_DATES' | 'COMPETITION_ENDED';
  message: string;
} 