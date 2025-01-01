export interface MatchingCardProps {
  onStart: () => void;
  onCancel: () => void;
  isMatching?: boolean;
  estimatedWaitTime?: string;
  error?: string;
} 