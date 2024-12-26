import { useState, useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import { ChatWebSocket } from '@/services/websocket/ChatWebSocket';

export function useChat(friendId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const wsRef = useRef<ChatWebSocket | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setIsLoading(true);
        // TODO: API 연동 후 실제 메시지 데이터 로드
        const mockMessages: Message[] = [
          {
            id: '1',
            text: '안녕하세요!',
            senderId: 'user1',
            timestamp: new Date('2024-01-01T10:00:00'),
          },
          {
            id: '2',
            text: '운동하러 가실래요?',
            senderId: 'user2',
            timestamp: new Date('2024-01-01T10:01:00'),
          },
        ];
        setMessages(mockMessages);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    // WebSocket 연결 설정
    wsRef.current = new ChatWebSocket();
    wsRef.current.onMessage((message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    loadMessages();

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      wsRef.current?.disconnect();
    };
  }, [friendId]);

  const sendMessage = async (text: string) => {
    try {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        senderId: 'user1',
        timestamp: new Date(),
      };

      // WebSocket을 통해 메시지 전송
      wsRef.current?.sendMessage(newMessage);
      
      // 로컬 상태 업데이트 (낙관적 업데이트)
      setMessages(prev => [...prev, newMessage]);
    } catch (err) {
      setError(err as Error);
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  };
} 