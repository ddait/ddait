import { Injectable } from '@nestjs/common';
import { CreateSessionDto, UpdateSessionDto } from '../../exercise/dto/exercise.dto';
import { CreateCompetitionDto } from '../../competition/dto/competition.dto';

@Injectable()
export class MockService {
  // Auth related mocks
  createMockUser(email: string) {
    return {
      id: '1',
      email,
      username: 'testuser',
      avatarUrl: 'https://example.com/avatar.jpg'
    };
  }

  findMockUserByEmail(email: string) {
    return {
      id: '1',
      email,
      username: 'testuser',
      avatarUrl: 'https://example.com/avatar.jpg'
    };
  }

  getMockUser(userId: string) {
    return {
      id: userId,
      email: 'test@example.com',
      username: 'testuser',
      avatarUrl: 'https://example.com/avatar.jpg'
    };
  }

  generateMockTokens() {
    return {
      accessToken: 'mock_access_token',
      refreshToken: 'mock_refresh_token'
    };
  }

  // Exercise related mocks
  createMockExerciseSession(userId: string, createDto: CreateSessionDto) {
    return {
      id: '1',
      userId,
      ...createDto,
      createdAt: new Date().toISOString()
    };
  }

  getMockExerciseSessions(userId: string, options: { page: number; limit: number }) {
    return {
      items: [
        {
          id: '1',
          userId,
          type: 'running',
          duration: 30,
          calories: 300,
          createdAt: new Date().toISOString()
        }
      ],
      total: 1
    };
  }

  getMockExerciseSession(sessionId: string) {
    return {
      id: sessionId,
      userId: '1',
      type: 'running',
      duration: 30,
      calories: 300,
      createdAt: new Date().toISOString()
    };
  }

  updateMockExerciseSession(sessionId: string, updateDto: UpdateSessionDto) {
    return {
      id: sessionId,
      userId: '1',
      ...updateDto,
      updatedAt: new Date().toISOString()
    };
  }

  deleteMockExerciseSession(sessionId: string) {
    return { success: true };
  }

  getMockExerciseStats(userId: string) {
    return {
      totalSessions: 10,
      totalDuration: 300,
      totalCalories: 3000,
      averageDuration: 30,
      averageCalories: 300
    };
  }

  getMockExerciseTemplates(category: string) {
    return [
      {
        id: '1',
        category,
        name: 'Basic Workout',
        description: 'A basic workout routine',
        exercises: [
          { name: 'Push-ups', sets: 3, reps: 10 },
          { name: 'Squats', sets: 3, reps: 15 }
        ]
      }
    ];
  }

  // Competition related mocks
  createMockCompetition(userId: string, createDto: CreateCompetitionDto) {
    return {
      id: '1',
      userId,
      ...createDto,
      status: 'waiting',
      createdAt: new Date().toISOString()
    };
  }

  getMockCompetitions(userId: string, options: { status: string; page: number; limit: number }) {
    return {
      items: [
        {
          id: '1',
          userId,
          type: 'one_on_one',
          status: options.status,
          createdAt: new Date().toISOString()
        }
      ],
      total: 1
    };
  }

  getMockCompetition(matchId: string) {
    return {
      id: matchId,
      type: 'one_on_one',
      status: 'in_progress',
      participants: [
        { userId: '1', score: 100 },
        { userId: '2', score: 80 }
      ],
      createdAt: new Date().toISOString()
    };
  }

  updateMockCompetitionScore(matchId: string, userId: string, score: number) {
    return {
      id: matchId,
      type: 'one_on_one',
      status: 'in_progress',
      participants: [
        { userId, score },
        { userId: '2', score: 80 }
      ],
      updatedAt: new Date().toISOString()
    };
  }

  getMockCompetitionStats(userId: string, options: { startDate: string; endDate: string }) {
    return {
      totalMatches: 10,
      wins: 7,
      losses: 3,
      winRate: 0.7,
      averageScore: 85
    };
  }
} 