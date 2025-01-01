import { ExerciseService } from '../exerciseService';
import {
  Exercise,
  WorkoutSession,
  CreateWorkoutSessionRequest,
  UpdateWorkoutSessionRequest,
  WorkoutSessionResponse
} from '../types';

describe('ExerciseService', () => {
  let exerciseService: ExerciseService;
  let mockApi: any;

  const mockExercise: Exercise = {
    id: '1',
    name: 'Bench Press',
    type: 'STRENGTH',
    targetMuscles: ['chest', 'triceps'],
    description: 'Barbell bench press'
  };

  const mockWorkoutSession: WorkoutSession = {
    id: '1',
    userId: 'user1',
    startTime: '2024-01-01T00:00:00Z',
    exercises: [
      {
        exerciseId: '1',
        sets: [
          {
            reps: 10,
            weight: 100,
            completed: true
          }
        ]
      }
    ],
    status: 'COMPLETED'
  };

  const mockWorkoutSessionResponse: WorkoutSessionResponse = {
    session: mockWorkoutSession,
    exercises: [mockExercise]
  };

  beforeEach(() => {
    mockApi = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn()
    };
    exerciseService = new ExerciseService(mockApi);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Exercise operations', () => {
    it('should get all exercises', async () => {
      mockApi.get.mockResolvedValueOnce({ data: [mockExercise] });

      const exercises = await exerciseService.getExercises();

      expect(mockApi.get).toHaveBeenCalledWith('/exercises');
      expect(exercises).toEqual([mockExercise]);
    });

    it('should get exercise by id', async () => {
      mockApi.get.mockResolvedValueOnce({ data: mockExercise });

      const exercise = await exerciseService.getExerciseById('1');

      expect(mockApi.get).toHaveBeenCalledWith('/exercises/1');
      expect(exercise).toEqual(mockExercise);
    });

    it('should handle exercise not found error', async () => {
      const mockError = {
        response: {
          data: {
            code: 'EXERCISE_NOT_FOUND',
            message: 'Exercise not found'
          }
        }
      };
      mockApi.get.mockRejectedValueOnce(mockError);

      await expect(exerciseService.getExerciseById('999')).rejects.toEqual(mockError.response.data);
    });
  });

  describe('Workout Session operations', () => {
    const createSessionRequest: CreateWorkoutSessionRequest = {
      exercises: [
        {
          exerciseId: '1',
          plannedSets: 3
        }
      ]
    };

    it('should create workout session', async () => {
      mockApi.post.mockResolvedValueOnce({ data: mockWorkoutSessionResponse });

      const response = await exerciseService.createWorkoutSession(createSessionRequest);

      expect(mockApi.post).toHaveBeenCalledWith('/workout-sessions', createSessionRequest);
      expect(response).toEqual(mockWorkoutSessionResponse);
    });

    it('should get workout session', async () => {
      mockApi.get.mockResolvedValueOnce({ data: mockWorkoutSessionResponse });

      const response = await exerciseService.getWorkoutSession('1');

      expect(mockApi.get).toHaveBeenCalledWith('/workout-sessions/1');
      expect(response).toEqual(mockWorkoutSessionResponse);
    });

    it('should update workout session', async () => {
      const updateRequest: UpdateWorkoutSessionRequest = {
        status: 'COMPLETED'
      };
      mockApi.patch.mockResolvedValueOnce({ data: mockWorkoutSessionResponse });

      const response = await exerciseService.updateWorkoutSession('1', updateRequest);

      expect(mockApi.patch).toHaveBeenCalledWith('/workout-sessions/1', updateRequest);
      expect(response).toEqual(mockWorkoutSessionResponse);
    });

    it('should get user workout history', async () => {
      mockApi.get.mockResolvedValueOnce({ data: [mockWorkoutSession] });

      const history = await exerciseService.getUserWorkoutHistory('user1');

      expect(mockApi.get).toHaveBeenCalledWith('/users/user1/workout-history');
      expect(history).toEqual([mockWorkoutSession]);
    });
  });
}); 