export interface WaitingIndicatorProps {
  onTimeout: () => void;
  timeout?: number;
  initialMessage?: string;
  statusMessages?: string[];
  testID?: string;
}

export interface WaitingStatus {
  isMatching: boolean;
  currentMessage: string;
  elapsedTime: number;
} 