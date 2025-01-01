import { ChatWebSocket } from '../ChatWebSocket';
import { Message } from '@/types/chat';

describe('ChatWebSocket', () => {
  let chatWebSocket: ChatWebSocket;
  let mockWebSocket: any;

  beforeEach(() => {
    mockWebSocket = {
      send: jest.fn(),
      close: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    // @ts-ignore
    global.WebSocket = jest.fn(() => mockWebSocket);
    
    chatWebSocket = new ChatWebSocket();
  });

  afterEach(() => {
    chatWebSocket.disconnect();
  });

  it('connects to websocket server', () => {
    expect(global.WebSocket).toHaveBeenCalledWith('ws://localhost:3000/chat');
    expect(mockWebSocket.addEventListener).toHaveBeenCalledWith('open', expect.any(Function));
    expect(mockWebSocket.addEventListener).toHaveBeenCalledWith('message', expect.any(Function));
    expect(mockWebSocket.addEventListener).toHaveBeenCalledWith('close', expect.any(Function));
    expect(mockWebSocket.addEventListener).toHaveBeenCalledWith('error', expect.any(Function));
  });

  it('sends message through websocket', () => {
    const message: Message = {
      id: '1',
      text: '안녕하세요!',
      senderId: 'user1',
      timestamp: new Date(),
    };

    chatWebSocket.sendMessage(message);

    expect(mockWebSocket.send).toHaveBeenCalledWith(JSON.stringify({
      type: 'message',
      data: message,
    }));
  });

  it('receives message through websocket', () => {
    const mockMessage: Message = {
      id: '2',
      text: '운동하러 가실래요?',
      senderId: 'user2',
      timestamp: new Date(),
    };

    const mockOnMessage = jest.fn();
    chatWebSocket.onMessage(mockOnMessage);

    // Simulate receiving a message
    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({
        type: 'message',
        data: {
          ...mockMessage,
          timestamp: mockMessage.timestamp.toISOString(),
        },
      }),
    });

    // Find the message event listener and call it
    const messageHandler = mockWebSocket.addEventListener.mock.calls.find(
      (call: any[]) => call[0] === 'message'
    )[1];
    messageHandler(messageEvent);

    expect(mockOnMessage).toHaveBeenCalledWith({
      ...mockMessage,
      timestamp: expect.any(Date),
    });
  });

  it('handles reconnection on connection close', () => {
    jest.useFakeTimers();

    // Find the close event listener and call it
    const closeHandler = mockWebSocket.addEventListener.mock.calls.find(
      (call: any[]) => call[0] === 'close'
    )[1];
    closeHandler();

    jest.advanceTimersByTime(5000);

    expect(global.WebSocket).toHaveBeenCalledTimes(2);

    jest.useRealTimers();
  });

  it('cleans up event listeners on disconnect', () => {
    chatWebSocket.disconnect();

    expect(mockWebSocket.removeEventListener).toHaveBeenCalledTimes(4);
    expect(mockWebSocket.close).toHaveBeenCalled();
  });
}); 