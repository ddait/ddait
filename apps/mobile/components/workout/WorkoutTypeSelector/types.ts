export interface IWorkoutType {
  id: string;
  name: string;
  icon: string;
  description?: string;
  category: WorkoutCategory;
}

export type WorkoutCategory = 'strength' | 'cardio' | 'flexibility' | 'sports';

export interface IWorkoutTypeSelectorProps {
  selectedType?: string;
  onSelect: (type: string) => void;
  disabled?: boolean;
  initialCategory?: WorkoutCategory;
} 