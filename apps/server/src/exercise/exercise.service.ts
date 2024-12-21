import { Injectable } from '@nestjs/common';
import { CreateSessionDto, UpdateSessionDto } from './dto/exercise.dto';
import { MockService } from '../common/mock/mock.service';

@Injectable()
export class ExerciseService {
  constructor(private readonly mockService: MockService) {}

  async createSession(userId: string, createDto: CreateSessionDto) {
    return this.mockService.createMockExerciseSession(userId, createDto);
  }

  async getSessions(userId: string, options: { page: number; limit: number }) {
    return this.mockService.getMockExerciseSessions(userId, options);
  }

  async getSession(sessionId: string) {
    return this.mockService.getMockExerciseSession(sessionId);
  }

  async updateSession(sessionId: string, updateDto: UpdateSessionDto) {
    return this.mockService.updateMockExerciseSession(sessionId, updateDto);
  }

  async deleteSession(sessionId: string) {
    return this.mockService.deleteMockExerciseSession(sessionId);
  }

  async getStats(userId: string) {
    return this.mockService.getMockExerciseStats(userId);
  }

  async getTemplates(category: string) {
    return this.mockService.getMockExerciseTemplates(category);
  }
} 