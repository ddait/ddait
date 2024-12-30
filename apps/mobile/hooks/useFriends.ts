import { useState, useCallback } from 'react';
import { IFriend, IFriendRequest } from '@/components/social/FriendsList/types';

export function useFriends() {
  const [friends, setFriends] = useState<IFriend[]>([]);
  const [friendRequests, setFriendRequests] = useState<IFriendRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchFriends = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: API 연동
      const mockFriends: IFriend[] = [
        {
          id: '1',
          name: '홍길동',
          avatar: 'https://example.com/avatar1.jpg',
          isOnline: true,
          lastActive: new Date().toISOString(),
          recentActivity: '운동을 완료했습니다',
        },
        {
          id: '2',
          name: '김철수',
          avatar: 'https://example.com/avatar2.jpg',
          isOnline: false,
          lastActive: new Date().toISOString(),
          recentActivity: '경쟁에서 승리했습니다',
        },
      ];
      const mockRequests: IFriendRequest[] = [
        {
          id: '1',
          userId: 'user3',
          name: '이영희',
          avatar: 'https://example.com/avatar3.jpg',
          requestTime: new Date().toISOString(),
        },
      ];
      setFriends(mockFriends);
      setFriendRequests(mockRequests);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    return fetchFriends();
  }, [fetchFriends]);

  const loadMore = useCallback(() => {
    // TODO: 페이지네이션 구현
  }, []);

  const handleAcceptRequest = useCallback((requestId: string) => {
    setFriendRequests(prev => prev.filter(request => request.id !== requestId));
    // TODO: API 연동
  }, []);

  const handleRejectRequest = useCallback((requestId: string) => {
    setFriendRequests(prev => prev.filter(request => request.id !== requestId));
    // TODO: API 연동
  }, []);

  return {
    friends,
    friendRequests,
    isLoading,
    error,
    refetch,
    loadMore,
    handleAcceptRequest,
    handleRejectRequest,
  };
} 