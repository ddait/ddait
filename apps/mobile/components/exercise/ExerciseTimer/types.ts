import { ViewStyle } from 'react-native';

export type TimeFormat = 'mm:ss' | '24h';

export interface ExerciseTimerProps {
  onTimeUpdate: (time: number) => void;
  format?: TimeFormat;
  showControls?: boolean;
  hapticFeedback?: boolean;
  style?: ViewStyle;
  autoStart?: boolean;
  targetTime?: number;
  onComplete?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  initialTime?: number;
} 