import { Injectable } from '@nestjs/common';
import { CreateCompetitionDto, UpdateScoreDto } from './dto/competition.dto';
import { MockService } from '../common/mock/mock.service';

@Injectable()
export class CompetitionService {
  constructor(private readonly mockService: MockService) {}

  async startMatching(userId: string, createDto: CreateCompetitionDto) {
    return this.mockService.createMockCompetition(userId, createDto);
  }

  async getMatches(userId: string, options: { status: string; page: number; limit: number }) {
    return this.mockService.getMockCompetitions(userId, options);
  }

  async getMatch(userId: string, matchId: string) {
    return this.mockService.getMockCompetition(matchId);
  }

  async updateScore(userId: string, matchId: string, updateDto: UpdateScoreDto) {
    return this.mockService.updateMockCompetitionScore(matchId, userId, updateDto.score);
  }

  async getStats(userId: string, options: { startDate: string; endDate: string }) {
    return this.mockService.getMockCompetitionStats(userId, options);
  }
} 