import { Message, ChatStatus, ChatRoom } from '@/types/chat';

type MessageCallback = (message: Message) => void;
type StatusCallback = (status: ChatStatus) => void;
type ChatUpdateCallback = (chat: ChatRoom) => void;

export class ChatService {
  private static instance: ChatService;
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;
  private readonly reconnectDelay = 1000;
  private messageCallbacks: Set<MessageCallback> = new Set();
  private statusCallbacks: Set<StatusCallback> = new Set();
  private chatUpdateCallbacks: Set<ChatUpdateCallback> = new Set();

  private constructor() {}

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  connect(userId: string) {
    // TODO: WebSocket 서버 구현 후 활성화
    console.log('WebSocket connection temporarily disabled');
    this.notifyStatusChange('connected');
    
    // 목업 데이터로 테스트
    setInterval(() => {
      if (Math.random() > 0.7) {
        this.notifyMessageReceived({
          id: Date.now().toString(),
          text: '테스트 메시지입니다.',
          senderId: 'user2',
          timestamp: new Date(),
          status: 'sent',
        });
      }
    }, 5000);
  }

  private reconnect(userId: string) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    setTimeout(() => {
      this.connect(userId);
    }, this.reconnectDelay * this.reconnectAttempts);
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
    this.notifyStatusChange('disconnected');
  }

  sendMessage(message: Message) {
    if (this.socket?.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }

    this.socket.send(JSON.stringify({
      type: 'message',
      message,
    }));
  }

  onMessage(callback: MessageCallback) {
    this.messageCallbacks.add(callback);
    return () => this.messageCallbacks.delete(callback);
  }

  onStatusChange(callback: StatusCallback) {
    this.statusCallbacks.add(callback);
    return () => this.statusCallbacks.delete(callback);
  }

  onChatUpdate(callback: ChatUpdateCallback) {
    this.chatUpdateCallbacks.add(callback);
    return () => this.chatUpdateCallbacks.delete(callback);
  }

  private notifyMessageReceived(message: Message) {
    this.messageCallbacks.forEach(callback => callback(message));
  }

  private notifyStatusChange(status: ChatStatus) {
    this.statusCallbacks.forEach(callback => callback(status));
  }

  private notifyChatUpdate(chat: ChatRoom) {
    this.chatUpdateCallbacks.forEach(callback => callback(chat));
  }
} 