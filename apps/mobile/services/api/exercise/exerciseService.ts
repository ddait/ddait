import { AxiosInstance } from 'axios';
import {
  Exercise,
  WorkoutSession,
  CreateWorkoutSessionRequest,
  UpdateWorkoutSessionRequest,
  WorkoutSessionResponse,
  ExerciseError
} from './types';

export class ExerciseService {
  constructor(private readonly api: AxiosInstance) {}

  // Exercise CRUD operations
  async getExercises(): Promise<Exercise[]> {
    try {
      const response = await this.api.get<Exercise[]>('/exercises');
      return response.data;
    } catch (error: any) {
      throw this.handleExerciseError(error);
    }
  }

  async getExerciseById(id: string): Promise<Exercise> {
    try {
      const response = await this.api.get<Exercise>(`/exercises/${id}`);
      return response.data;
    } catch (error: any) {
      throw this.handleExerciseError(error);
    }
  }

  // Workout Session operations
  async createWorkoutSession(request: CreateWorkoutSessionRequest): Promise<WorkoutSessionResponse> {
    try {
      const response = await this.api.post<WorkoutSessionResponse>('/workout-sessions', request);
      return response.data;
    } catch (error: any) {
      throw this.handleExerciseError(error);
    }
  }

  async getWorkoutSession(sessionId: string): Promise<WorkoutSessionResponse> {
    try {
      const response = await this.api.get<WorkoutSessionResponse>(`/workout-sessions/${sessionId}`);
      return response.data;
    } catch (error: any) {
      throw this.handleExerciseError(error);
    }
  }

  async updateWorkoutSession(
    sessionId: string,
    request: UpdateWorkoutSessionRequest
  ): Promise<WorkoutSessionResponse> {
    try {
      const response = await this.api.patch<WorkoutSessionResponse>(
        `/workout-sessions/${sessionId}`,
        request
      );
      return response.data;
    } catch (error: any) {
      throw this.handleExerciseError(error);
    }
  }

  async getUserWorkoutHistory(userId: string): Promise<WorkoutSession[]> {
    try {
      const response = await this.api.get<WorkoutSession[]>(`/users/${userId}/workout-history`);
      return response.data;
    } catch (error: any) {
      throw this.handleExerciseError(error);
    }
  }

  private handleExerciseError(error: any): ExerciseError {
    if (error.response?.data?.code) {
      return error.response.data as ExerciseError;
    }

    return {
      code: 'INVALID_EXERCISE_DATA',
      message: 'An unexpected error occurred'
    };
  }
} 