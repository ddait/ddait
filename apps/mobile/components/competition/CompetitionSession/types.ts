export interface CompetitionOpponent {
  name: string;
  level: number;
  currentScore: number;
}

export interface CompetitionSessionProps {
  opponent: CompetitionOpponent;
  myScore?: number;
  opponentScore?: number;
  remainingTime?: number;
  progress?: number;
  isComplete?: boolean;
  onComplete: () => void;
  onGiveUp: () => void;
} 