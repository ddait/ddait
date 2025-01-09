import { useState, useEffect, useCallback, useRef } from 'react';
import { Message, ChatStatus } from '@/types/chat';
import { ChatService } from '@/services/chat/ChatService';

const MESSAGES_PER_PAGE = 50;

export function useChat(roomId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<ChatStatus>('connecting');
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1);

  const chatService = ChatService.getInstance();

  const loadMessages = useCallback(async (pageNum: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: API 연동
      const mockMessages: Message[] = [
        {
          id: '1',
          text: '안녕하세요!',
          senderId: 'user1',
          timestamp: new Date('2024-01-01T10:00:00'),
          status: 'read',
        },
        {
          id: '2',
          text: '운동하러 가실래요?',
          senderId: 'user2',
          timestamp: new Date('2024-01-01T10:01:00'),
          status: 'delivered',
        },
      ];

      if (pageNum === 1) {
        setMessages(mockMessages);
      } else {
        setMessages(prev => [...mockMessages, ...prev]);
      }

      setHasMore(mockMessages.length === MESSAGES_PER_PAGE);
      page.current = pageNum;
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    try {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        senderId: 'user1', // TODO: 실제 사용자 ID로 변경
        timestamp: new Date(),
        status: 'sent',
      };

      chatService.sendMessage(newMessage);
      
      // 낙관적 업데이트
      setMessages(prev => [...prev, newMessage]);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [chatService]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    loadMessages(page.current + 1);
  }, [hasMore, isLoading, loadMessages]);

  const handleMessageReceived = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const handleStatusChange = useCallback((newStatus: ChatStatus) => {
    setStatus(newStatus);
  }, []);

  useEffect(() => {
    loadMessages();

    chatService.connect('user1'); // TODO: 실제 사용자 ID로 변경

    const messageUnsubscribe = chatService.onMessage(handleMessageReceived);
    const statusUnsubscribe = chatService.onStatusChange(handleStatusChange);

    return () => {
      messageUnsubscribe();
      statusUnsubscribe();
      chatService.disconnect();
    };
  }, [chatService, handleMessageReceived, handleStatusChange, loadMessages]);

  return {
    messages,
    isLoading,
    error,
    status,
    sendMessage,
    loadMore,
    hasMore,
  };
} 