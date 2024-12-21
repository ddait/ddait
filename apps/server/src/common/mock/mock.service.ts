import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MockService {
  private mockUsers: Map<string, any> = new Map();
  private mockSessions: Map<string, any> = new Map();
  private mockCompetitions: Map<string, any> = new Map();

  constructor() {
    // 초기 더미 데이터 생성
    this.initializeMockData();
  }

  private initializeMockData() {
    // 더미 유저 생성
    const userId = uuidv4();
    const mockUser = {
      id: userId,
      email: 'test@example.com',
      username: 'testuser',
      avatarUrl: 'https://example.com/avatar.jpg',
      level: 1,
      exp: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockUsers.set(userId, mockUser);

    // 더미 세션 생성
    const sessionId = uuidv4();
    const mockSession = {
      id: sessionId,
      userId,
      type: 'running',
      startTime: new Date(),
      endTime: null,
      duration: 0,
      calories: 0,
      status: 'active'
    };
    this.mockSessions.set(sessionId, mockSession);

    // 더미 경쟁 생성
    const competitionId = uuidv4();
    const mockCompetition = {
      id: competitionId,
      type: '1v1',
      status: 'waiting',
      startTime: null,
      endTime: null,
      maxParticipants: 2,
      currentParticipants: 1,
      participants: [userId]
    };
    this.mockCompetitions.set(competitionId, mockCompetition);
  }

  // Auth 관련 더미 데이터
  getMockUser(userId: string) {
    return this.mockUsers.get(userId);
  }

  createMockUser(userData: any) {
    const userId = uuidv4();
    const newUser = {
      id: userId,
      ...userData,
      level: 1,
      exp: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockUsers.set(userId, newUser);
    return newUser;
  }

  // Exercise 관련 더미 데이터
  getMockSession(sessionId: string) {
    return this.mockSessions.get(sessionId);
  }

  createMockSession(userId: string, type: string) {
    const sessionId = uuidv4();
    const newSession = {
      id: sessionId,
      userId,
      type,
      startTime: new Date(),
      endTime: null,
      duration: 0,
      calories: 0,
      status: 'active'
    };
    this.mockSessions.set(sessionId, newSession);
    return newSession;
  }

  // Competition 관련 더미 데이터
  getMockCompetition(competitionId: string) {
    return this.mockCompetitions.get(competitionId);
  }

  createMockCompetition(type: string, userId: string) {
    const competitionId = uuidv4();
    const newCompetition = {
      id: competitionId,
      type,
      status: 'waiting',
      startTime: null,
      endTime: null,
      maxParticipants: 2,
      currentParticipants: 1,
      participants: [userId]
    };
    this.mockCompetitions.set(competitionId, newCompetition);
    return newCompetition;
  }

  // 유틸리티 메서드
  generateMockToken() {
    return `mock_token_${uuidv4()}`;
  }

  generateMockRefreshToken() {
    return `mock_refresh_token_${uuidv4()}`;
  }
} 