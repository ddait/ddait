export interface Opponent {
  name: string;
  level: number;
  winRate: number;
}

export interface WaitingCardProps {
  onStart: () => void;
  onCancel: () => void;
  opponent?: Opponent;
  isOpponentReady?: boolean;
} 