export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'file';
  url: string;
  name: string;
  size: number;
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: Attachment[];
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group';
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ChatStatus = 'connecting' | 'connected' | 'disconnected';

export interface ChatPagination {
  page: number;
  limit: number;
  hasMore: boolean;
  total?: number;
} 