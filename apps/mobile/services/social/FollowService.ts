import { 
  IEnhancedFollowUser, 
  IFollowResponse, 
  IFollowStats, 
  IFollowFilter, 
  IFollowActionResponse,
  IFollowRelationship,
} from '@/components/social/Follow/types';

class FollowService {
  private static instance: FollowService;
  private cache: Map<string, IEnhancedFollowUser>;
  private relationshipCache: Map<string, IFollowRelationship>;
  private statsCache: Map<string, IFollowStats>;

  private constructor() {
    this.cache = new Map();
    this.relationshipCache = new Map();
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
            bio: '운동을 사랑하는 사람',
            exercisePreferences: ['헬스', '러닝'],
            level: 3,
            lastActive: new Date().toISOString(),
            followStatus: 'following',
            followersCount: 100,
            followingCount: 50,
            mutualFriends: 5,
            relationship: {
              id: 'rel1',
              followerId: userId,
              followingId: 'user1',
              createdAt: new Date().toISOString(),
              status: 'following',
              notificationSettings: {
                posts: true,
                achievements: true,
                exercises: true,
              },
            },
            recentActivities: [
              {
                type: 'exercise',
                timestamp: new Date().toISOString(),
                summary: '러닝 5km 완료',
                metadata: {
                  exerciseId: 'ex1',
                },
              },
            ],
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
            bio: '매일 운동하는 삶',
            exercisePreferences: ['크로스핏', '요가'],
            level: 5,
            lastActive: new Date().toISOString(),
            followStatus: 'mutual',
            followersCount: 200,
            followingCount: 150,
            mutualFriends: 10,
            relationship: {
              id: 'rel2',
              followerId: userId,
              followingId: 'user2',
              createdAt: new Date().toISOString(),
              status: 'mutual',
              notificationSettings: {
                posts: true,
                achievements: true,
                exercises: false,
              },
            },
            recentActivities: [
              {
                type: 'achievement',
                timestamp: new Date().toISOString(),
                summary: '100일 연속 운동 달성',
                metadata: {
                  achievementId: 'ach1',
                },
              },
            ],
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
        const relationship: IFollowRelationship = {
          id: `rel_${Date.now()}`,
          followerId: 'currentUserId', // TODO: 실제 현재 사용자 ID로 대체
          followingId: userId,
          createdAt: new Date().toISOString(),
          status: 'following',
          notificationSettings: {
            posts: true,
            achievements: true,
            exercises: true,
          },
        };

        const updatedUser = {
          ...user,
          followStatus: 'following' as const,
          followersCount: user.followersCount + 1,
          relationship,
        };

        this.updateFollowCache(userId, updatedUser);
        this.relationshipCache.set(userId, relationship);

        return {
          success: true,
          user: updatedUser,
          relationship,
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
        const relationship: IFollowRelationship = {
          id: `rel_${Date.now()}`,
          followerId: 'currentUserId', // TODO: 실제 현재 사용자 ID로 대체
          followingId: userId,
          createdAt: new Date().toISOString(),
          status: 'none',
          notificationSettings: {
            posts: false,
            achievements: false,
            exercises: false,
          },
        };

        const updatedUser = {
          ...user,
          followStatus: 'none' as const,
          followersCount: Math.max(0, user.followersCount - 1),
          relationship,
        };

        this.updateFollowCache(userId, updatedUser);
        this.relationshipCache.delete(userId);

        return {
          success: true,
          user: updatedUser,
          relationship,
        };
      }
      throw new Error('User not found');
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 알림 설정 업데이트
  async updateNotificationSettings(
    userId: string,
    settings: Partial<IFollowRelationship['notificationSettings']>
  ): Promise<void> {
    try {
      // TODO: API 연동
      const relationship = this.relationshipCache.get(userId);
      if (relationship) {
        const updatedRelationship = {
          ...relationship,
          notificationSettings: {
            ...relationship.notificationSettings,
            ...settings,
          },
        };
        this.relationshipCache.set(userId, updatedRelationship);
      }
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
        mutualCount: 20,
      };

      // 통계 캐시 업데이트
      this.statsCache.set(userId, stats);
      return stats;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 캐시 업데이트
  private updateFollowCache(userId: string, data: IEnhancedFollowUser): void {
    this.cache.set(userId, data);
  }

  // 캐시 초기화
  public clearFollowCache(userId?: string): void {
    if (userId) {
      this.cache.delete(userId);
      this.relationshipCache.delete(userId);
      this.statsCache.delete(userId);
    } else {
      this.cache.clear();
      this.relationshipCache.clear();
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