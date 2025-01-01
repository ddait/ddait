import type { StyleProp, ViewStyle } from 'react-native';

export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

export interface ExerciseTimerProps {
  /**
   * Callback function that is called every second with the current time in seconds
   */
  onTimeUpdate: (time: number) => void;
  
  /**
   * Initial time in seconds
   * @default 0
   */
  initialTime?: number;
  
  /**
   * Target time in seconds. When reached, the timer will stop and call onComplete
   */
  targetTime?: number;
  
  /**
   * Time format to display
   * @default 'mm:ss'
   */
  format?: '24h' | 'mm:ss';
  
  /**
   * Whether to start the timer automatically
   * @default false
   */
  autoStart?: boolean;
  
  /**
   * Whether to show the control buttons
   * @default true
   */
  showControls?: boolean;
  
  /**
   * Callback function that is called when the target time is reached
   */
  onComplete?: () => void;
  
  /**
   * Callback function that is called when the timer is paused
   */
  onPause?: () => void;
  
  /**
   * Callback function that is called when the timer is resumed
   */
  onResume?: () => void;
  
  /**
   * Whether to enable haptic feedback
   * @default true
   */
  hapticFeedback?: boolean;
  
  /**
   * Additional styles for the container
   */
  style?: StyleProp<ViewStyle>;
} 