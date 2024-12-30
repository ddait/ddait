export interface IActiveMatch {
  id: string;
  type: 'oneOnOne' | 'group' | 'ranking' | 'history';
  participants: {
    id: string;
    name: string;
    avatar?: string;
    score: number;
  }[];
  startTime: string;
  endTime: string;
  status: 'waiting' | 'inProgress' | 'completed';
}

export interface ActiveMatchesProps {
  matches: IActiveMatch[];
  onMatchPress?: (matchId: string) => void;
  isLoading?: boolean;
}

export interface ActiveMatchCardProps {
  match: IActiveMatch;
  onPress?: () => void;
} 