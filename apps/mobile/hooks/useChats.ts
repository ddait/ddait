import { useState, useCallback, useEffect } from 'react';
import { ChatRoom, ChatPagination } from '@/types/chat';
import { ChatService } from '@/services/chat/ChatService';

const CHATS_PER_PAGE = 20;

export function useChats() {
  const [chats, setChats] = useState<ChatRoom[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<ChatPagination>({
    page: 1,
    limit: CHATS_PER_PAGE,
    hasMore: true,
  });

  const chatService = ChatService.getInstance();

  const fetchChats = useCallback(async (page: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: API 연동
      const mockChats: ChatRoom[] = [
        {
          id: '1',
          name: '운동 모임',
          type: 'group',
          participants: [
            { id: 'user1', name: '사용자1', avatar: 'https://i.pravatar.cc/150?img=1' },
            { id: 'user2', name: '사용자2', avatar: 'https://i.pravatar.cc/150?img=2' },
          ],
          lastMessage: {
            id: 'm1',
            text: '오늘 저녁 7시에 공원에서 만나요!',
            senderId: 'user1',
            timestamp: new Date(),
            status: 'delivered',
          },
          unreadCount: 2,
          avatar: 'https://i.pravatar.cc/150?img=4',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      if (page === 1) {
        setChats(mockChats);
      } else {
        setChats(prev => [...prev, ...mockChats]);
      }

      setPagination(prev => ({
        ...prev,
        page,
        hasMore: mockChats.length === CHATS_PER_PAGE,
      }));
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    return fetchChats(1);
  }, [fetchChats]);

  const loadMore = useCallback(() => {
    if (!pagination.hasMore || isLoading) return;
    fetchChats(pagination.page + 1);
  }, [pagination.hasMore, pagination.page, isLoading, fetchChats]);

  const updateChat = useCallback((updatedChat: ChatRoom) => {
    setChats(prev => {
      const index = prev.findIndex(chat => chat.id === updatedChat.id);
      if (index === -1) return [updatedChat, ...prev];
      
      const newChats = [...prev];
      newChats[index] = updatedChat;
      return newChats;
    });
  }, []);

  useEffect(() => {
    fetchChats();

    const unsubscribe = chatService.onChatUpdate(updateChat);
    return () => {
      unsubscribe();
    };
  }, [fetchChats, chatService, updateChat]);

  return {
    chats,
    isLoading,
    error,
    refetch,
    loadMore,
    hasMore: pagination.hasMore,
  };
} 