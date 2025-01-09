import { useState, useCallback, useEffect, useRef } from 'react';
import { 
  IEnhancedFollowUser, 
  IFollowStats, 
  IFollowFilter,
  IFollowRelationship,
} from '@/components/social/Follow/types';
import FollowService from '@/services/social/FollowService';

export function useFollow(
  userId: string,
  initialFilter?: IFollowFilter
) {
  // 상태 관리
  const [followers, setFollowers] = useState<IEnhancedFollowUser[]>([]);
  const [following, setFollowing] = useState<IEnhancedFollowUser[]>([]);
  const [stats, setStats] = useState<IFollowStats>({ 
    followersCount: 0, 
    followingCount: 0,
    mutualCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState<IFollowFilter | undefined>(initialFilter);
  const [currentPage, setCurrentPage] = useState(1);

  // FollowService 인스턴스
  const followService = useRef(FollowService.getInstance());

  // 팔로워 목록 조회
  const fetchFollowers = useCallback(async (page: number, refresh = false) => {
    try {
      setError(null);
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const response = await followService.current.getFollowers(userId, {
        ...filter,
      });

      setFollowers(prev => 
        refresh ? response.users : [...prev, ...response.users]
      );
      setHasMore(response.pagination.hasMore);
      setCurrentPage(response.pagination.currentPage);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [userId, filter]);

  // 팔로잉 목록 조회
  const fetchFollowing = useCallback(async (page: number, refresh = false) => {
    try {
      setError(null);
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const response = await followService.current.getFollowing(userId, {
        ...filter,
      });

      setFollowing(prev => 
        refresh ? response.users : [...prev, ...response.users]
      );
      setHasMore(response.pagination.hasMore);
      setCurrentPage(response.pagination.currentPage);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [userId, filter]);

  // 통계 조회
  const fetchStats = useCallback(async () => {
    try {
      const stats = await followService.current.getFollowStats(userId);
      setStats(stats);
    } catch (err) {
      console.error('Failed to fetch follow stats:', err);
    }
  }, [userId]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchFollowers(1, true);
    fetchFollowing(1, true);
    fetchStats();
  }, [fetchFollowers, fetchFollowing, fetchStats]);

  // 팔로우 액션
  const follow = useCallback(async (targetUserId: string) => {
    try {
      const response = await followService.current.follow(targetUserId);
      if (response.success) {
        // 팔로잉 목록 업데이트
        setFollowing(prev => 
          prev.map(user => 
            user.id === targetUserId 
              ? { ...user, ...response.user }
              : user
          )
        );
        // 통계 업데이트
        await fetchStats();
      }
    } catch (err) {
      console.error('Failed to follow user:', err);
      throw err;
    }
  }, [fetchStats]);

  // 언팔로우 액션
  const unfollow = useCallback(async (targetUserId: string) => {
    try {
      const response = await followService.current.unfollow(targetUserId);
      if (response.success) {
        // 팔로잉 목록 업데이트
        setFollowing(prev => 
          prev.map(user => 
            user.id === targetUserId 
              ? { ...user, ...response.user }
              : user
          )
        );
        // 통계 업데이트
        await fetchStats();
      }
    } catch (err) {
      console.error('Failed to unfollow user:', err);
      throw err;
    }
  }, [fetchStats]);

  // 알림 설정 업데이트
  const updateNotificationSettings = useCallback(async (
    targetUserId: string,
    settings: Partial<IFollowRelationship['notificationSettings']>
  ) => {
    try {
      await followService.current.updateNotificationSettings(targetUserId, settings);
      // 관계 정보가 있는 사용자 목록 업데이트
      setFollowing(prev =>
        prev.map(user =>
          user.id === targetUserId && user.relationship
            ? {
                ...user,
                relationship: {
                  ...user.relationship,
                  notificationSettings: {
                    ...user.relationship.notificationSettings,
                    ...settings,
                  },
                },
              }
            : user
        )
      );
    } catch (err) {
      console.error('Failed to update notification settings:', err);
      throw err;
    }
  }, []);

  // 새로고침
  const refresh = useCallback(async () => {
    setCurrentPage(1);
    await Promise.all([
      fetchFollowers(1, true),
      fetchFollowing(1, true),
      fetchStats(),
    ]);
  }, [fetchFollowers, fetchFollowing, fetchStats]);

  // 추가 데이터 로드
  const loadMore = useCallback(() => {
    if (!isLoading && !isRefreshing && hasMore) {
      fetchFollowers(currentPage + 1);
      fetchFollowing(currentPage + 1);
    }
  }, [currentPage, hasMore, isLoading, isRefreshing, fetchFollowers, fetchFollowing]);

  // 필터 업데이트
  const updateFilter = useCallback((newFilter: Partial<IFollowFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
    setCurrentPage(1);
    fetchFollowers(1, true);
    fetchFollowing(1, true);
  }, [fetchFollowers, fetchFollowing]);

  return {
    followers,
    following,
    stats,
    isLoading,
    isRefreshing,
    error,
    hasMore,
    filter,
    follow,
    unfollow,
    updateNotificationSettings,
    refresh,
    loadMore,
    updateFilter,
  };
} 