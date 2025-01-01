export interface Exercise {
  id: string;
  name: string;
  type: 'STRENGTH' | 'CARDIO';
  targetMuscles: string[];
  description?: string;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  exercises: WorkoutExercise[];
  status: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: ExerciseSet[];
}

export interface ExerciseSet {
  reps?: number;
  weight?: number;
  duration?: number; // in seconds
  distance?: number; // in meters
  completed: boolean;
}

export interface CreateWorkoutSessionRequest {
  exercises: Array<{
    exerciseId: string;
    plannedSets: number;
  }>;
}

export interface UpdateWorkoutSessionRequest {
  status?: 'COMPLETED' | 'CANCELLED';
  exercises?: Array<{
    exerciseId: string;
    sets: Array<{
      reps?: number;
      weight?: number;
      duration?: number;
      distance?: number;
      completed: boolean;
    }>;
  }>;
}

export interface WorkoutSessionResponse {
  session: WorkoutSession;
  exercises: Exercise[];
}

export interface ExerciseError {
  code: 'EXERCISE_NOT_FOUND' | 'INVALID_EXERCISE_DATA' | 'SESSION_NOT_FOUND' | 'INVALID_SESSION_STATUS';
  message: string;
}

export interface UserSummary {
  summary: {
    calories: number;
    duration: number;
    progress: number;
  };
  weeklyProgress: {
    days: Array<{
      date: string;
      calories: number;
      duration: number;
      completed: boolean;
    }>;
    weeklyGoal: {
      target: number;
      current: number;
    };
  };
} 