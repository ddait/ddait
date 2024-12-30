export interface IChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  participants: string[];
  avatar?: string;
}

export interface IChatListProps {
  chatRooms?: IChatRoom[];
  isLoading?: boolean;
  onChatRoomPress?: (chatRoom: IChatRoom) => void;
  onRefresh?: () => void;
  onLoadMore?: () => void;
}

export interface IChatListItemProps {
  chatRoom: IChatRoom;
  onPress?: (chatRoom: IChatRoom) => void;
} 