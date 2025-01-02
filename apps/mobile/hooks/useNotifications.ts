import { useState, useCallback, useEffect, useRef } from 'react';
import { INotification, INotificationFilters, NotificationSortType } from '@/components/social/Notifications/types';
import NotificationService from '@/services/notification/NotificationService';

export function useNotifications(
  initialFilters?: INotificationFilters,
  initialSort: NotificationSortType = 'newest'
) {
  // 상태 관리
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<INotificationFilters | undefined>(initialFilters);
  const [sort, setSort] = useState<NotificationSortType>(initialSort);

  // NotificationService 인스턴스
  const notificationService = useRef(NotificationService.getInstance());

  // 알림 목록 조회
  const fetchNotifications = useCallback(async (page: number, refresh = false) => {
    try {
      setError(null);
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const response = await notificationService.current.getNotifications(
        page,
        20,
        filters,
        sort
      );

      setNotifications(prev => 
        refresh ? response.notifications : [...prev, ...response.notifications]
      );
      setHasMore(response.pagination.hasMore);
      setCurrentPage(response.pagination.currentPage);

      // 읽지 않은 알림 수 업데이트
      const count = await notificationService.current.getUnreadCount();
      setUnreadCount(count);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [filters, sort]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchNotifications(1, true);
  }, [fetchNotifications]);

  // 새로고침
  const refresh = useCallback(() => {
    return fetchNotifications(1, true);
  }, [fetchNotifications]);

  // 추가 데이터 로드
  const loadMore = useCallback(() => {
    if (!isLoading && !isRefreshing && hasMore) {
      fetchNotifications(currentPage + 1);
    }
  }, [currentPage, hasMore, isLoading, isRefreshing, fetchNotifications]);

  // 알림 읽음 처리
  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await notificationService.current.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, status: 'read' }
            : notification
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  }, []);

  // 전체 읽음 처리
  const markAllAsRead = useCallback(async () => {
    try {
      await notificationService.current.markAllAsRead();
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, status: 'read' }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
    }
  }, []);

  // 알림 삭제
  const deleteNotification = useCallback(async (notificationId: string) => {
    try {
      await notificationService.current.deleteNotification(notificationId);
      setNotifications(prev => 
        prev.filter(notification => notification.id !== notificationId)
      );
      // 삭제된 알림이 읽지 않은 상태였다면 카운트 감소
      const deletedNotification = notifications.find(n => n.id === notificationId);
      if (deletedNotification?.status === 'unread') {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  }, [notifications]);

  // 필터 변경
  const updateFilters = useCallback((newFilters: INotificationFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    fetchNotifications(1, true);
  }, [fetchNotifications]);

  // 정렬 변경
  const updateSort = useCallback((newSort: NotificationSortType) => {
    setSort(newSort);
    setCurrentPage(1);
    fetchNotifications(1, true);
  }, [fetchNotifications]);

  return {
    notifications,
    isLoading,
    isRefreshing,
    error,
    hasMore,
    unreadCount,
    filters,
    sort,
    refresh,
    loadMore,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    updateFilters,
    updateSort,
  };
} 