import { useState, useCallback, useEffect } from 'react';
import { INotification } from '@/components/social/Notifications/types';

const initialNotifications: INotification[] = [
  {
    id: '1',
    type: 'friend_request',
    message: '김운동님이 친구 요청을 보냈습니다',
    isRead: false,
    timestamp: new Date().toISOString(),
    metadata: {
      userId: 'user1',
      avatar: 'https://i.pravatar.cc/150?img=6',
    },
  },
  {
    id: '2',
    type: 'competition',
    message: '새로운 운동 챌린지가 시작되었습니다: 30일 플랭크 챌린지',
    isRead: true,
    timestamp: new Date().toISOString(),
    metadata: {
      challengeId: 'challenge1',
      type: 'plank',
    },
  },
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<INotification[]>(initialNotifications);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: API 연동
      setNotifications(initialNotifications);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

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