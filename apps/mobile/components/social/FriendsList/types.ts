export interface IFriend {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastActive: string;
  recentActivity?: string;
}

export interface IFriendRequest {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  requestTime: string;
}

export interface IFriendsListProps {
  friends?: IFriend[];
  friendRequests?: IFriendRequest[];
  isLoading?: boolean;
  onAcceptRequest?: (requestId: string) => void;
  onRejectRequest?: (requestId: string) => void;
  onFriendPress?: (friend: IFriend) => void;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  onSearch?: (query: string) => void;
}

export interface IFriendCardProps {
  friend: IFriend;
  onPress?: (friend: IFriend) => void;
} 