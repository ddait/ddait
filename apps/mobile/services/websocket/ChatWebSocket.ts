import { Message } from '@/types/chat';

interface WebSocketMessageData extends Omit<Message, 'timestamp'> {
  timestamp: string;
}

interface WebSocketMessage {
  type: 'message';
  data: WebSocketMessageData;
}

export class ChatWebSocket {
  private ws: WebSocket | null = null;
  private messageHandlers: ((message: Message) => void)[] = [];
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private readonly RECONNECT_DELAY = 5000;
  private readonly WS_URL = 'ws://localhost:3000/chat';

  constructor() {
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.WS_URL);

    this.ws.addEventListener('open', this.handleOpen);
    this.ws.addEventListener('message', this.handleMessage);
    this.ws.addEventListener('close', this.handleClose);
    this.ws.addEventListener('error', this.handleError);
  }

  private handleOpen = () => {
    console.log('WebSocket connected');
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  };

  private handleMessage = (event: MessageEvent) => {
    try {
      const message: WebSocketMessage = JSON.parse(event.data);
      if (message.type === 'message') {
        const processedMessage: Message = {
          ...message.data,
          timestamp: new Date(message.data.timestamp),
        };
        this.messageHandlers.forEach(handler => handler(processedMessage));
      }
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  };

  private handleClose = () => {
    console.log('WebSocket disconnected, attempting to reconnect...');
    this.scheduleReconnect();
  };

  private handleError = (error: Event) => {
    console.error('WebSocket error:', error);
    this.scheduleReconnect();
  };

  private scheduleReconnect() {
    if (!this.reconnectTimeout) {
      this.reconnectTimeout = setTimeout(() => {
        this.connect();
      }, this.RECONNECT_DELAY);
    }
  }

  public sendMessage(message: Message) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      const wsMessage: WebSocketMessage = {
        type: 'message',
        data: {
          id: message.id,
          text: message.text,
          senderId: message.senderId,
          timestamp: message.timestamp.toISOString(),
        },
      };
      this.ws.send(JSON.stringify(wsMessage));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  public onMessage(handler: (message: Message) => void) {
    this.messageHandlers.push(handler);
  }

  public disconnect() {
    if (this.ws) {
      this.ws.removeEventListener('open', this.handleOpen);
      this.ws.removeEventListener('message', this.handleMessage);
      this.ws.removeEventListener('close', this.handleClose);
      this.ws.removeEventListener('error', this.handleError);
      this.ws.close();
      this.ws = null;
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }
} 