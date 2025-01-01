export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updatedAt: Date;
} 