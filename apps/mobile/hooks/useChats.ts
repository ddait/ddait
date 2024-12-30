import { useState, useCallback } from 'react';
import { IChatRoom } from '@/components/social/ChatList/types';

export function useChats() {
  const [chats, setChats] = useState<IChatRoom[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchChats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: API 연동
      const mockChats: IChatRoom[] = [
        {
          id: '1',
          name: '운동 모임',
          lastMessage: '오늘 운동 어떠셨나요?',
          lastMessageTime: new Date().toISOString(),
          unreadCount: 2,
          participants: ['user1', 'user2', 'user3'],
        },
        {
          id: '2',
          name: '경쟁 채팅',
          lastMessage: '다음 경쟁은 언제하나요?',
          lastMessageTime: new Date().toISOString(),
          unreadCount: 0,
          participants: ['user1', 'user4'],
        },
      ];
      setChats(mockChats);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

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