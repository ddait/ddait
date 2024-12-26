import { useState, useCallback, useEffect } from 'react';
import type { Friend } from '@/components/social/FriendCard/types';

interface FriendWithStats extends Friend {
  workoutStats: {
    totalWorkouts: number;
    totalMinutes: number;
    favoriteExercise: string;
  };
}

interface UseFriendResult {
  friend: FriendWithStats | null;
  isLoading: boolean;
  error: Error | null;
  removeFriend: (id: string) => Promise<void>;
}

// TODO: Replace with actual API call
const mockFetchFriend = async (id: string): Promise<FriendWithStats> => {
  // Simulate network delay
  if (process.env.NODE_ENV !== 'test') {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Simulate API response
  return {
    id,
    name: '홍길동',
    status: 'online',
    profileImage: 'https://example.com/1.jpg',
    workoutStats: {
      totalWorkouts: 42,
      totalMinutes: 1260,
      favoriteExercise: '벤치프레스',
    },
  };
};

export function useFriend(id: string): UseFriendResult {
  const [friend, setFriend] = useState<FriendWithStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchFriend = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await mockFetchFriend(id);
      setFriend(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch friend'));
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const removeFriend = useCallback(async (friendId: string) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFriend(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to remove friend'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFriend();
  }, [fetchFriend]);

  return { friend, isLoading, error, removeFriend };
} 