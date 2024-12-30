import { useState, useCallback } from 'react';
import { IActivity } from '@/components/social/ActivityFeed/types';

export function useActivities() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchActivities = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: API 연동
      const mockActivities: IActivity[] = [
        {
          id: '1',
          userId: 'user1',
          type: 'exercise',
          content: '운동을 완료했습니다',
          timestamp: new Date().toISOString(),
        },
        {
          id: '2',
          userId: 'user2',
          type: 'competition',
          content: '경쟁에서 승리했습니다',
          timestamp: new Date().toISOString(),
        },
      ];
      setActivities(mockActivities);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    return fetchActivities();
  }, [fetchActivities]);

  const loadMore = useCallback(() => {
    // TODO: 페이지네이션 구현
  }, []);

  return {
    activities,
    isLoading,
    error,
    refetch,
    loadMore,
  };
} 