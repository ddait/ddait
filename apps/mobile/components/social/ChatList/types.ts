import { ChatRoom } from '@/types/chat';

export interface IChatListProps {
  chatRooms: ChatRoom[];
  isLoading?: boolean;
  onChatRoomPress?: (chatRoom: ChatRoom) => void;
  onRefresh?: () => void;
  onLoadMore?: () => void;
}

export interface IChatListItemProps {
  chatRoom: ChatRoom;
  onPress?: (chatRoom: ChatRoom) => void;
} 