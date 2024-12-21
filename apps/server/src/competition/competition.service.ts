import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { MockService } from '../common/mock/mock.service';
import { CreateCompetitionDto, UpdateCompetitionDto, CompetitionStatus, CompetitionType, MatchRequestDto } from './dto/competition.dto';

@Injectable()
export class CompetitionService {
  constructor(private readonly mockService: MockService) {}

  async createCompetition(userId: string, createCompetitionDto: CreateCompetitionDto) {
    const competition = this.mockService.createMockCompetition(createCompetitionDto.type, userId);
    return {
      ...competition,
      exerciseType: createCompetitionDto.exerciseType,
      maxParticipants: createCompetitionDto.maxParticipants || 2,
      scores: { [userId]: 0 }
    };
  }

  async getCompetition(competitionId: string) {
    const competition = this.mockService.getMockCompetition(competitionId);
    if (!competition) {
      throw new NotFoundException('Competition not found');
    }
    return competition;
  }

  async updateCompetition(competitionId: string, userId: string, updateCompetitionDto: UpdateCompetitionDto) {
    const competition = this.mockService.getMockCompetition(competitionId);
    if (!competition) {
      throw new NotFoundException('Competition not found');
    }

    if (!competition.participants.includes(userId)) {
      throw new BadRequestException('User is not a participant of this competition');
    }

    // 점수 업데이트
    if (updateCompetitionDto.score !== undefined) {
      competition.scores[userId] = updateCompetitionDto.score;
    }

    // 상태 업데이트
    if (updateCompetitionDto.status) {
      competition.status = updateCompetitionDto.status;
      
      if (updateCompetitionDto.status === CompetitionStatus.COMPLETED) {
        competition.endTime = new Date();
      } else if (updateCompetitionDto.status === CompetitionStatus.IN_PROGRESS) {
        competition.startTime = new Date();
      }
    }

    // 업데이트된 경쟁 저장
    this.mockService['mockCompetitions'].set(competitionId, {
      ...competition,
      updatedAt: new Date()
    });

    return competition;
  }

  async findMatch(userId: string, matchRequestDto: MatchRequestDto) {
    // 대기 중인 경쟁 찾기
    const waitingCompetition = Array.from(this.mockService['mockCompetitions'].values()).find(
      comp => 
        comp.status === CompetitionStatus.WAITING &&
        comp.type === matchRequestDto.type &&
        comp.exerciseType === matchRequestDto.exerciseType &&
        !comp.participants.includes(userId) &&
        comp.currentParticipants < comp.maxParticipants
    );

    if (waitingCompetition) {
      // 기존 경쟁에 참가
      waitingCompetition.participants.push(userId);
      waitingCompetition.currentParticipants += 1;
      waitingCompetition.scores[userId] = 0;

      if (waitingCompetition.currentParticipants === waitingCompetition.maxParticipants) {
        waitingCompetition.status = CompetitionStatus.IN_PROGRESS;
        waitingCompetition.startTime = new Date();
      }

      this.mockService['mockCompetitions'].set(waitingCompetition.id, waitingCompetition);
      return waitingCompetition;
    }

    // 새로운 경쟁 생성
    return this.createCompetition(userId, {
      type: matchRequestDto.type,
      exerciseType: matchRequestDto.exerciseType,
      maxParticipants: matchRequestDto.type === CompetitionType.ONE_VS_ONE ? 2 : 4
    });
  }

  async getUserCompetitions(userId: string) {
    const competitions = Array.from(this.mockService['mockCompetitions'].values())
      .filter(comp => comp.participants.includes(userId))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return {
      competitions,
      total: competitions.length
    };
  }

  async getCompetitionStats(userId: string) {
    const competitions = Array.from(this.mockService['mockCompetitions'].values())
      .filter(comp => 
        comp.participants.includes(userId) && 
        comp.status === CompetitionStatus.COMPLETED
      );

    const totalCompetitions = competitions.length;
    let wins = 0;
    let losses = 0;
    let draws = 0;

    // 타입별 통계
    const typeStats: Record<CompetitionType, { total: number; wins: number; winRate: number }> = {
      [CompetitionType.ONE_VS_ONE]: { total: 0, wins: 0, winRate: 0 },
      [CompetitionType.GROUP]: { total: 0, wins: 0, winRate: 0 },
      [CompetitionType.PAST_RECORD]: { total: 0, wins: 0, winRate: 0 }
    };

    competitions.forEach(comp => {
      // 타입별 통계 업데이트
      typeStats[comp.type].total += 1;

      // 승패 계산
      const userScore = comp.scores[userId] || 0;
      const maxScore = Math.max(...Object.values(comp.scores) as number[]);

      if (userScore === maxScore) {
        if (Object.values(comp.scores).filter(score => score === maxScore).length > 1) {
          draws += 1;
        } else {
          wins += 1;
          typeStats[comp.type].wins += 1;
        }
      } else {
        losses += 1;
      }
    });

    // 승률 계산
    const winRate = totalCompetitions > 0 ? (wins / totalCompetitions) * 100 : 0;

    // 타입별 승률 계산
    Object.values(CompetitionType).forEach(type => {
      const stats = typeStats[type];
      stats.winRate = stats.total > 0 ? (stats.wins / stats.total) * 100 : 0;
    });

    return {
      totalCompetitions,
      wins,
      losses,
      draws,
      winRate,
      typeStats
    };
  }
} 