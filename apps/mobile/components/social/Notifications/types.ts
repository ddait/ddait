export type NotificationType =
  | 'friend_request'    // 친구 요청
  | 'friend_accept'     // 친구 수락
  | 'competition'       // 경쟁 관련
  | 'competition_invite'// 경쟁 초대
  | 'achievement'       // 업적 달성
  | 'exercise'         // 운동 관련
  | 'system'           // 시스템 알림
  | 'chat'            // 채팅 알림
  | 'like'            // 좋아요
  | 'comment';        // 댓글

export type NotificationStatus = 'unread' | 'read' | 'deleted';

export interface INotificationMetadata {
  // 사용자 관련
  userId?: string;
  username?: string;
  userAvatar?: string;

  // 경쟁 관련
  competitionId?: string;
  competitionType?: string;
  competitionTitle?: string;

  // 운동 관련
  exerciseId?: string;
  exerciseType?: string;
  exerciseTitle?: string;

  // 업적 관련
  achievementId?: string;
  achievementTitle?: string;
  achievementIcon?: string;

  // 소셜 관련
  postId?: string;
  commentId?: string;
  
  // 채팅 관련
  chatRoomId?: string;
  messageId?: string;

  // 추가 데이터
  link?: string;
  imageUrl?: string;
  actionType?: string;
}

export interface INotification {
  id: string;
  type: NotificationType;
  status: NotificationStatus;
  message: string;
  timestamp: string;
  metadata: INotificationMetadata;
  priority?: 'high' | 'normal' | 'low';
  expiresAt?: string;
}

export interface INotificationResponse {
  notifications: INotification[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasMore: boolean;
  };
}

export interface INotificationsProps {
  notifications?: INotification[];
  isLoading?: boolean;
  isRefreshing?: boolean;
  hasMore?: boolean;
  onNotificationPress?: (notification: INotification) => void;
  onMarkAsRead?: (notificationId: string) => void;
  onDelete?: (notificationId: string) => void;
  onRefresh?: () => void;
  onLoadMore?: () => void;
}

export interface INotificationItemProps {
  notification: INotification;
  onPress?: (notification: INotification) => void;
  onMarkAsRead?: (notificationId: string) => void;
  onDelete?: (notificationId: string) => void;
}

export interface INotificationFilters {
  type?: NotificationType[];
  status?: NotificationStatus[];
  startDate?: string;
  endDate?: string;
}

export type NotificationSortType = 'newest' | 'oldest' | 'priority'; 