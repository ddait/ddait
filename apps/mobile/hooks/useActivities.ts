import { useState, useCallback, useEffect } from 'react';
import { IActivity } from '@/components/social/ActivityFeed/types';

const initialActivities: IActivity[] = [
  {
    id: '1',
    userId: 'user1',
    type: 'exercise',
    content: '오늘 5km 달리기를 완료했습니다',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    userId: 'user2',
    type: 'competition',
    content: '주간 운동 챌린지에서 1등을 달성했습니다',
    timestamp: new Date().toISOString(),
  },
];

export function useActivities() {
  const [activities, setActivities] = useState<IActivity[]>(initialActivities);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchActivities = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: API 연동
      setActivities(initialActivities);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

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