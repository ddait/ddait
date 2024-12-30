import { useState, useCallback } from 'react';
import { INotification } from '@/components/social/Notifications/types';

export function useNotifications() {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: API 연동
      const mockNotifications: INotification[] = [
        {
          id: '1',
          type: 'friend_request',
          message: '홍길동님이 친구 요청을 보냈습니다',
          isRead: false,
          timestamp: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'competition',
          message: '새로운 경쟁이 시작되었습니다',
          isRead: true,
          timestamp: new Date().toISOString(),
        },
      ];
      setNotifications(mockNotifications);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    return fetchNotifications();
  }, [fetchNotifications]);

  const loadMore = useCallback(() => {
    // TODO: 페이지네이션 구현
  }, []);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
    // TODO: API 연동
  }, []);

  return {
    notifications,
    isLoading,
    error,
    refetch,
    loadMore,
    markAsRead,
  };
} 