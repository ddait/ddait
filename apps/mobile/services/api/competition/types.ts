export interface Competition {
  id: string;
  type: string;
  remainingTime: string;
  players: Array<{
    name: string;
    score: number;
  }>;
  status: 'waiting' | 'in_progress' | 'completed';
}

export interface CreateCompetitionRequest {
  type: string;
  startTime?: string;
  endTime?: string;
  maxParticipants?: number;
  rules?: {
    scoreType: 'calories' | 'duration' | 'distance';
    targetValue?: number;
  };
}

export interface JoinCompetitionRequest {
  userId: string;
  nickname: string;
}

export interface SubmitCompetitionResultRequest {
  userId: string;
  score: number;
  exerciseData: {
    calories?: number;
    duration?: number;
    distance?: number;
  };
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
  code: string;
  message: string;
} 