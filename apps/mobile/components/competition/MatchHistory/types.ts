export interface IMatchResult {
  id: string;
  type: 'oneOnOne' | 'group' | 'ranking';
  date: string;
  duration: number; // 분 단위
  participants: {
    id: string;
    name: string;
    avatar?: string;
    score: number;
    rank: number;
  }[];
  status: 'win' | 'lose' | 'draw';
  exerciseType: string;
  stats: {
    totalCalories: number;
    avgHeartRate: number;
    distance?: number;
    pace?: number;
  };
}

export interface IDateRange {
  startDate: Date;
  endDate: Date;
}

export interface MatchHistoryProps {
  matches: IMatchResult[];
  onMatchPress?: (matchId: string) => void;
  isLoading?: boolean;
}

export interface MatchHistoryCardProps {
  match: IMatchResult;
  onPress?: () => void;
}

export interface DateRangeFilterProps {
  range: IDateRange;
  onRangeChange: (range: IDateRange) => void;
}

export interface MatchStatsProps {
  stats: {
    totalMatches: number;
    wins: number;
    losses: number;
    draws: number;
    winRate: number;
    avgScore: number;
    bestScore: number;
  };
} 