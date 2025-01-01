import { StyleProp, ViewStyle } from 'react-native';

export type ExerciseStatus = 'active' | 'paused' | 'completed';
export type ExerciseType = 'running' | 'cycling' | 'swimming' | 'walking' | 'strength';
export type ExerciseCardVariant = 'default' | 'compact';

export interface ExerciseCardCommonProps {
  /** The title of the exercise */
  title: string;
  /** The type of exercise */
  type: ExerciseType;
  /** Duration in seconds */
  duration: number;
  /** Calories burned */
  calories: number;
  /** Progress percentage (0-100) */
  progress?: number;
  /** Display variant */
  variant?: ExerciseCardVariant;
  /** Custom styles */
  style?: StyleProp<ViewStyle>;
  /** Called when the card is pressed */
  onPress?: () => void;
}

export interface ActiveExerciseCardProps extends ExerciseCardCommonProps {
  status: 'active';
  onPause: () => void;
  onStop: () => void;
}

export interface PausedExerciseCardProps extends ExerciseCardCommonProps {
  status: 'paused';
  onResume: () => void;
  onStop: () => void;
}

export interface CompletedExerciseCardProps extends ExerciseCardCommonProps {
  status: 'completed';
}

export type ExerciseCardProps = ActiveExerciseCardProps | PausedExerciseCardProps | CompletedExerciseCardProps; 