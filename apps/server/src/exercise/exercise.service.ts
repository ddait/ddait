import { Injectable, NotFoundException } from '@nestjs/common';
import { MockService } from '../common/mock/mock.service';
import { CreateSessionDto, UpdateSessionDto, SessionStatus } from './dto/exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(private readonly mockService: MockService) {}

  async createSession(userId: string, createSessionDto: CreateSessionDto) {
    const session = this.mockService.createMockSession(userId, createSessionDto.type);
    return session;
  }

  async getSession(sessionId: string) {
    const session = this.mockService.getMockSession(sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }
    return session;
  }

  async updateSession(sessionId: string, updateSessionDto: UpdateSessionDto) {
    const session = this.mockService.getMockSession(sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    // 세션 업데이트
    const updatedSession = {
      ...session,
      ...updateSessionDto,
      updatedAt: new Date()
    };

    // 세션이 완료되면 종료 시간과 통계 계산
    if (updateSessionDto.status === SessionStatus.COMPLETED) {
      updatedSession.endTime = new Date();
      updatedSession.duration = Math.floor(
        (updatedSession.endTime.getTime() - session.startTime.getTime()) / 1000
      );
      updatedSession.calories = Math.floor(updatedSession.duration * 0.1); // 더미 칼로리 계산
    }

    // 업데이트된 세션 저장
    this.mockService['mockSessions'].set(sessionId, updatedSession);

    return updatedSession;
  }

  async getUserSessions(userId: string) {
    // 사용자의 모든 세션 조회
    const sessions = Array.from(this.mockService['mockSessions'].values())
      .filter(session => session.userId === userId)
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());

    return {
      sessions,
      total: sessions.length
    };
  }

  async getSessionStats(userId: string) {
    const sessions = Array.from(this.mockService['mockSessions'].values())
      .filter(session => session.userId === userId && session.status === SessionStatus.COMPLETED);

    const totalSessions = sessions.length;
    const totalDuration = sessions.reduce((sum, session) => sum + (session.duration || 0), 0);
    const totalCalories = sessions.reduce((sum, session) => sum + (session.calories || 0), 0);

    const averageDuration = totalSessions > 0 ? Math.floor(totalDuration / totalSessions) : 0;

    // 가장 많이 한 운동 유형 찾기
    const typeCount = sessions.reduce((acc, session) => {
      acc[session.type] = (acc[session.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostFrequentType = Object.entries(typeCount).reduce<{ type: string | null; count: number }>(
      (max, [type, count]) => ((count as number) > max.count ? { type, count: count as number } : max),
      { type: null, count: 0 }
    ).type;

    return {
      totalSessions,
      totalDuration,
      totalCalories,
      averageDuration,
      mostFrequentType
    };
  }
} 