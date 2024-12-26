import { useState, useCallback, useEffect } from 'react';
import type { Friend } from '@/components/social/FriendCard/types';

interface UseFriendsResult {
  friends: Friend[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// TODO: Replace with actual API call
const mockFetchFriends = async (): Promise<Friend[]> => {
  // Simulate network delay only in production
  if (process.env.NODE_ENV !== 'test') {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Simulate API response
  return [
    {
      id: '1',
      name: '홍길동',
      status: 'online',
      profileImage: 'https://example.com/1.jpg',
    },
    {
      id: '2',
      name: '김철수',
      status: 'offline',
      profileImage: 'https://example.com/2.jpg',
    },
  ];
};

export function useFriends(): UseFriendsResult {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchFriends = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await mockFetchFriends();
      setFriends(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch friends'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    await fetchFriends();
  }, [fetchFriends]);

  // Fetch friends on mount
  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  return { friends, isLoading, error, refetch };
} 