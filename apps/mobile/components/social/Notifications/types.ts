export type NotificationType = 'friend_request' | 'competition' | 'achievement' | 'system';

export interface INotification {
  id: string;
  type: NotificationType;
  message: string;
  isRead: boolean;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface INotificationsProps {
  notifications?: INotification[];
  isLoading?: boolean;
  onNotificationPress?: (notification: INotification) => void;
  onMarkAsRead?: (notificationId: string) => void;
  onRefresh?: () => void;
  onLoadMore?: () => void;
} 