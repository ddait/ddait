import { useState, useCallback, useEffect } from 'react';
import { IChatRoom } from '@/components/social/ChatList/types';

const initialChats: IChatRoom[] = [
  {
    id: '1',
    name: '운동 모임',
    lastMessage: '오늘 저녁 7시에 공원에서 만나요!',
    lastMessageTime: new Date().toISOString(),
    unreadCount: 2,
    participants: ['user1', 'user2', 'user3'],
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: '2',
    name: '챌린지 그룹',
    lastMessage: '이번 주 목표를 달성하셨나요?',
    lastMessageTime: new Date().toISOString(),
    unreadCount: 0,
    participants: ['user1', 'user4'],
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
];

export function useChats() {
  const [chats, setChats] = useState<IChatRoom[]>(initialChats);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchChats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: API 연동
      setChats(initialChats);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const refetch = useCallback(() => {
    return fetchChats();
  }, [fetchChats]);

  const loadMore = useCallback(() => {
    // TODO: 페이지네이션 구현
  }, []);

  return {
    chats,
    isLoading,
    error,
    refetch,
    loadMore,
  };
} 