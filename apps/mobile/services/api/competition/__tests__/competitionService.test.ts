import { CompetitionService } from '../competitionService';
import {
  Competition,
  CreateCompetitionRequest,
  JoinCompetitionRequest,
  SubmitCompetitionResultRequest,
  CompetitionLeaderboard
} from '../types';

describe('CompetitionService', () => {
  let competitionService: CompetitionService;
  let mockApi: any;

  const mockCompetition: Competition = {
    id: '1',
    title: 'Summer Fitness Challenge',
    description: 'A 30-day fitness challenge',
    startDate: '2024-06-01T00:00:00Z',
    endDate: '2024-06-30T23:59:59Z',
    type: 'INDIVIDUAL',
    status: 'UPCOMING',
    participants: [
      {
        userId: 'user1',
        nickname: 'challenger1',
        score: 0
      }
    ],
    rules: {
      scoringSystem: 'POINTS',
      targetExercises: ['exercise1', 'exercise2'],
      minimumSets: 3,
      minimumReps: 10
    }
  };

  const mockLeaderboard: CompetitionLeaderboard = {
    competitionId: '1',
    rankings: [
      {
        rank: 1,
        userId: 'user1',
        nickname: 'challenger1',
        score: 100,
        lastUpdated: '2024-06-15T12:00:00Z'
      }
    ]
  };

  beforeEach(() => {
    mockApi = {
      get: jest.fn(),
      post: jest.fn()
    };
    competitionService = new CompetitionService(mockApi);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Competition operations', () => {
    it('should get all competitions', async () => {
      mockApi.get.mockResolvedValueOnce({ data: [mockCompetition] });

      const competitions = await competitionService.getCompetitions();

      expect(mockApi.get).toHaveBeenCalledWith('/competitions', { params: undefined });
      expect(competitions).toEqual([mockCompetition]);
    });

    it('should get competitions by status', async () => {
      mockApi.get.mockResolvedValueOnce({ data: [mockCompetition] });

      const competitions = await competitionService.getCompetitions('UPCOMING');

      expect(mockApi.get).toHaveBeenCalledWith('/competitions', { params: { status: 'UPCOMING' } });
      expect(competitions).toEqual([mockCompetition]);
    });

    it('should get competition by id', async () => {
      mockApi.get.mockResolvedValueOnce({ data: mockCompetition });

      const competition = await competitionService.getCompetitionById('1');

      expect(mockApi.get).toHaveBeenCalledWith('/competitions/1');
      expect(competition).toEqual(mockCompetition);
    });

    it('should create competition', async () => {
      const createRequest: CreateCompetitionRequest = {
        title: mockCompetition.title,
        description: mockCompetition.description,
        startDate: mockCompetition.startDate,
        endDate: mockCompetition.endDate,
        type: mockCompetition.type,
        rules: mockCompetition.rules
      };

      mockApi.post.mockResolvedValueOnce({ data: mockCompetition });

      const competition = await competitionService.createCompetition(createRequest);

      expect(mockApi.post).toHaveBeenCalledWith('/competitions', createRequest);
      expect(competition).toEqual(mockCompetition);
    });

    it('should join competition', async () => {
      const joinRequest: JoinCompetitionRequest = {
        userId: 'user1'
      };

      mockApi.post.mockResolvedValueOnce({ data: mockCompetition });

      const competition = await competitionService.joinCompetition('1', joinRequest);

      expect(mockApi.post).toHaveBeenCalledWith('/competitions/1/join', joinRequest);
      expect(competition).toEqual(mockCompetition);
    });

    it('should submit competition result', async () => {
      const submitRequest: SubmitCompetitionResultRequest = {
        userId: 'user1',
        workoutSessionId: 'session1'
      };

      mockApi.post.mockResolvedValueOnce({ data: mockCompetition });

      const competition = await competitionService.submitResult('1', submitRequest);

      expect(mockApi.post).toHaveBeenCalledWith('/competitions/1/submit-result', submitRequest);
      expect(competition).toEqual(mockCompetition);
    });

    it('should get competition leaderboard', async () => {
      mockApi.get.mockResolvedValueOnce({ data: mockLeaderboard });

      const leaderboard = await competitionService.getLeaderboard('1');

      expect(mockApi.get).toHaveBeenCalledWith('/competitions/1/leaderboard');
      expect(leaderboard).toEqual(mockLeaderboard);
    });

    it('should get user competitions', async () => {
      mockApi.get.mockResolvedValueOnce({ data: [mockCompetition] });

      const competitions = await competitionService.getUserCompetitions('user1');

      expect(mockApi.get).toHaveBeenCalledWith('/users/user1/competitions');
      expect(competitions).toEqual([mockCompetition]);
    });

    it('should handle competition not found error', async () => {
      const mockError = {
        response: {
          data: {
            code: 'COMPETITION_NOT_FOUND',
            message: 'Competition not found'
          }
        }
      };
      mockApi.get.mockRejectedValueOnce(mockError);

      await expect(competitionService.getCompetitionById('999')).rejects.toEqual(mockError.response.data);
    });
  });
}); 