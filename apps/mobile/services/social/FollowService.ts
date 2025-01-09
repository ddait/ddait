import { IFollowUser, IFollowResponse, IFollowStats, IFollowFilter, IFollowActionResponse } from '@/components/social/Follow/types';

class FollowService {
  private static instance: FollowService;
  private cache: Map<string, IFollowUser>;
  private statsCache: Map<string, IFollowStats>;

  private constructor() {
    this.cache = new Map();
    this.statsCache = new Map();
  }

  public static getInstance(): FollowService {
    if (!FollowService.instance) {
      FollowService.instance = new FollowService();
    }
    return FollowService.instance;
  }

  // 팔로워 목록 조회
  async getFollowers(
    userId: string,
    params?: IFollowFilter
  ): Promise<IFollowResponse> {
    try {
      // TODO: API 연동
      // 임시로 더미 데이터 반환
      return {
        users: [
          {
            id: 'user1',
            username: '김운동',
            avatar: 'https://i.pravatar.cc/150?img=1',
            followStatus: 'following',
            followersCount: 100,
            followingCount: 50,
          },
        ],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 1,
          hasMore: false,
        },
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 팔로잉 목록 조회
  async getFollowing(
    userId: string,
    params?: IFollowFilter
  ): Promise<IFollowResponse> {
    try {
      // TODO: API 연동
      // 임시로 더미 데이터 반환
      return {
        users: [
          {
            id: 'user2',
            username: '박헬스',
            avatar: 'https://i.pravatar.cc/150?img=2',
            followStatus: 'mutual',
            followersCount: 200,
            followingCount: 150,
          },
        ],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 1,
          hasMore: false,
        },
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 팔로우 하기
  async follow(userId: string): Promise<IFollowActionResponse> {
    try {
      // TODO: API 연동
      const user = this.cache.get(userId);
      if (user) {
        const updatedUser = {
          ...user,
          followStatus: 'following' as const,
          followersCount: user.followersCount + 1,
        };
        this.updateFollowCache(userId, updatedUser);
        return {
          success: true,
          user: updatedUser,
        };
      }
      throw new Error('User not found');
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 언팔로우 하기
  async unfollow(userId: string): Promise<IFollowActionResponse> {
    try {
      // TODO: API 연동
      const user = this.cache.get(userId);
      if (user) {
        const updatedUser = {
          ...user,
          followStatus: 'none' as const,
          followersCount: Math.max(0, user.followersCount - 1),
        };
        this.updateFollowCache(userId, updatedUser);
        return {
          success: true,
          user: updatedUser,
        };
      }
      throw new Error('User not found');
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 팔로우 통계 조회
  async getFollowStats(userId: string): Promise<IFollowStats> {
    try {
      // 캐시된 통계가 있으면 반환
      const cachedStats = this.statsCache.get(userId);
      if (cachedStats) {
        return cachedStats;
      }

      // TODO: API 연동
      // 임시로 더미 데이터 반환
      const stats = {
        followersCount: 100,
        followingCount: 50,
      };

      // 통계 캐시 업데이트
      this.statsCache.set(userId, stats);
      return stats;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 캐시 업데이트
  private updateFollowCache(userId: string, data: IFollowUser): void {
    this.cache.set(userId, data);
  }

  // 캐시 초기화
  public clearFollowCache(userId?: string): void {
    if (userId) {
      this.cache.delete(userId);
      this.statsCache.delete(userId);
    } else {
      this.cache.clear();
      this.statsCache.clear();
    }
  }

  // 에러 처리
  private handleError(error: any): Error {
    // TODO: 에러 타입에 따른 적절한 처리
    console.error('FollowService Error:', error);
    return error instanceof Error ? error : new Error('Unknown error occurred');
  }
}

export default FollowService; 