import { useState, useCallback, useEffect } from 'react';
import { IFriend, IFriendRequest } from '@/components/social/FriendsList/types';

const initialFriends: IFriend[] = [
  {
    id: '1',
    name: '김운동',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isOnline: true,
    lastActive: new Date().toISOString(),
    recentActivity: '오늘 5km 달리기를 완료했습니다',
  },
  {
    id: '2',
    name: '이헬스',
    avatar: 'https://i.pravatar.cc/150?img=2',
    isOnline: false,
    lastActive: new Date().toISOString(),
    recentActivity: '주간 운동 챌린지에서 1등을 달성했습니다',
  },
];

const initialRequests: IFriendRequest[] = [
  {
    id: '1',
    userId: 'user3',
    name: '박피트',
    avatar: 'https://i.pravatar.cc/150?img=3',
    requestTime: new Date().toISOString(),
  },
];

export function useFriends() {
  const [friends, setFriends] = useState<IFriend[]>(initialFriends);
  const [friendRequests, setFriendRequests] = useState<IFriendRequest[]>(initialRequests);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchFriends = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: API 연동
      setFriends(initialFriends);
      setFriendRequests(initialRequests);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

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