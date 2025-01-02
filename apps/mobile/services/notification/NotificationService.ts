import { INotification, INotificationResponse, INotificationFilters, NotificationSortType } from '@/components/social/Notifications/types';

class NotificationService {
  private static instance: NotificationService;
  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // 알림 목록 조회
  async getNotifications(
    page: number = 1,
    limit: number = 20,
    filters?: INotificationFilters,
    sort: NotificationSortType = 'newest'
  ): Promise<INotificationResponse> {
    try {
      // TODO: API 연동
      return {
        notifications: [],
        pagination: {
          currentPage: page,
          totalPages: 1,
          totalItems: 0,
          hasMore: false,
        },
      };
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      throw error;
    }
  }

  // 알림 읽음 처리
  async markAsRead(notificationId: string): Promise<void> {
    try {
      // TODO: API 연동
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      throw error;
    }
  }

  // 알림 일괄 읽음 처리
  async markAllAsRead(): Promise<void> {
    try {
      // TODO: API 연동
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      throw error;
    }
  }

  // 알림 삭제
  async deleteNotification(notificationId: string): Promise<void> {
    try {
      // TODO: API 연동
    } catch (error) {
      console.error('Failed to delete notification:', error);
      throw error;
    }
  }

  // 읽지 않은 알림 수 조회
  async getUnreadCount(): Promise<number> {
    try {
      // TODO: API 연동
      return 0;
    } catch (error) {
      console.error('Failed to get unread count:', error);
      throw error;
    }
  }

  // 알림 설정 조회
  async getNotificationSettings(): Promise<Record<string, boolean>> {
    try {
      // TODO: API 연동
      return {
        friendRequest: true,
        competition: true,
        achievement: true,
        exercise: true,
        chat: true,
        system: true,
      };
    } catch (error) {
      console.error('Failed to get notification settings:', error);
      throw error;
    }
  }

  // 알림 설정 업데이트
  async updateNotificationSettings(settings: Record<string, boolean>): Promise<void> {
    try {
      // TODO: API 연동
    } catch (error) {
      console.error('Failed to update notification settings:', error);
      throw error;
    }
  }
}

export default NotificationService; 