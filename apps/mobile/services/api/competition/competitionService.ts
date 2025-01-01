import { AxiosInstance } from 'axios';
import {
  Competition,
  CreateCompetitionRequest,
  JoinCompetitionRequest,
  SubmitCompetitionResultRequest,
  CompetitionLeaderboard,
  CompetitionError
} from './types';

export class CompetitionService {
  constructor(private readonly api: AxiosInstance) {}

  async getCompetitions(status?: 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED'): Promise<Competition[]> {
    try {
      const response = await this.api.get<Competition[]>('/competitions', {
        params: status ? { status } : undefined
      });
      return response.data;
    } catch (error: any) {
      throw this.handleCompetitionError(error);
    }
  }

  async getCompetitionById(id: string): Promise<Competition> {
    try {
      const response = await this.api.get<Competition>(`/competitions/${id}`);
      return response.data;
    } catch (error: any) {
      throw this.handleCompetitionError(error);
    }
  }

  async createCompetition(request: CreateCompetitionRequest): Promise<Competition> {
    try {
      const response = await this.api.post<Competition>('/competitions', request);
      return response.data;
    } catch (error: any) {
      throw this.handleCompetitionError(error);
    }
  }

  async joinCompetition(competitionId: string, request: JoinCompetitionRequest): Promise<Competition> {
    try {
      const response = await this.api.post<Competition>(
        `/competitions/${competitionId}/join`,
        request
      );
      return response.data;
    } catch (error: any) {
      throw this.handleCompetitionError(error);
    }
  }

  async submitResult(
    competitionId: string,
    request: SubmitCompetitionResultRequest
  ): Promise<Competition> {
    try {
      const response = await this.api.post<Competition>(
        `/competitions/${competitionId}/submit-result`,
        request
      );
      return response.data;
    } catch (error: any) {
      throw this.handleCompetitionError(error);
    }
  }

  async getLeaderboard(competitionId: string): Promise<CompetitionLeaderboard> {
    try {
      const response = await this.api.get<CompetitionLeaderboard>(
        `/competitions/${competitionId}/leaderboard`
      );
      return response.data;
    } catch (error: any) {
      throw this.handleCompetitionError(error);
    }
  }

  async getUserCompetitions(userId: string): Promise<Competition[]> {
    try {
      const response = await this.api.get<Competition[]>(`/users/${userId}/competitions`);
      return response.data;
    } catch (error: any) {
      throw this.handleCompetitionError(error);
    }
  }

  async getActiveCompetitions(): Promise<Competition[]> {
    try {
      const response = await this.api.get<Competition[]>('/competitions/active');
      return response.data;
    } catch (error: any) {
      throw this.handleCompetitionError(error);
    }
  }

  private handleCompetitionError(error: any): CompetitionError {
    if (error.response?.data?.code) {
      return error.response.data as CompetitionError;
    }

    return {
      code: 'INVALID_COMPETITION_DATA',
      message: 'An unexpected error occurred'
    };
  }
} 