export type LeaderBoardPeriod = 'weekly' | 'monthly';

export interface ILeaderBoardUser {
  id: string;
  name: string;
  rank: number;
  score: number;
  avatar?: string;
  isCurrentUser: boolean;
  trend: 'up' | 'down' | 'same';
  previousRank: number;
}

export interface IScoreHistory {
  date: string;
  score: number;
}

export interface LeaderBoardProps {
  period: LeaderBoardPeriod;
  users: ILeaderBoardUser[];
  onPeriodChange: (period: LeaderBoardPeriod) => void;
  isLoading?: boolean;
}

export interface LeaderBoardHeaderProps {
  period: LeaderBoardPeriod;
  onPeriodChange: (period: LeaderBoardPeriod) => void;
}

export interface LeaderBoardItemProps {
  user: ILeaderBoardUser;
  onPress?: () => void;
}

export interface ScoreHistoryProps {
  data: IScoreHistory[];
  period: LeaderBoardPeriod;
} 