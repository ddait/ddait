import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ChatRoom } from './ChatRoom';
import { useChat } from '@/hooks/useChat';

jest.mock('@/hooks/useChat');

const mockMessages = [
  {
    id: '1',
    text: '안녕하세요!',
    senderId: 'user1',
    timestamp: new Date('2024-01-01T10:00:00'),
  },
  {
    id: '2',
    text: '운동하러 가실래요?',
    senderId: 'user2',
    timestamp: new Date('2024-01-01T10:01:00'),
  },
];

describe('ChatRoom', () => {
  const mockSendMessage = jest.fn();

  beforeEach(() => {
    (useChat as jest.Mock).mockReturnValue({
      messages: mockMessages,
      isLoading: false,
      error: null,
      sendMessage: mockSendMessage,
    });
  });

  it('renders loading state', () => {
    (useChat as jest.Mock).mockReturnValue({
      messages: [],
      isLoading: true,
      error: null,
      sendMessage: mockSendMessage,
    });

    const { getByTestId } = render(<ChatRoom friendId="user2" />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders messages', () => {
    const { getByText } = render(<ChatRoom friendId="user2" />);
    expect(getByText('안녕하세요!')).toBeTruthy();
    expect(getByText('운동하러 가실래요?')).toBeTruthy();
  });

  it('renders error state', () => {
    (useChat as jest.Mock).mockReturnValue({
      messages: [],
      isLoading: false,
      error: new Error('Failed to load messages'),
      sendMessage: mockSendMessage,
    });

    const { getByText } = render(<ChatRoom friendId="user2" />);
    expect(getByText('메시지를 불러오는데 실패했습니다.')).toBeTruthy();
  });

  it('handles sending message', () => {
    const { getByPlaceholderText, getByTestId } = render(<ChatRoom friendId="user2" />);
    
    const input = getByPlaceholderText('메시지를 입력하세요...');
    const sendButton = getByTestId('send-button');

    fireEvent.changeText(input, '새로운 메시지');
    fireEvent.press(sendButton);

    expect(mockSendMessage).toHaveBeenCalledWith('새로운 메시지');
  });

  it('disables send button when input is empty', () => {
    const { getByTestId, getByPlaceholderText } = render(<ChatRoom friendId="user2" />);
    const input = getByPlaceholderText('메시지를 입력하세요...');
    const sendButton = getByTestId('send-button');

    fireEvent.changeText(input, '');
    expect(sendButton.props.accessibilityState.disabled).toBeTruthy();

    fireEvent.changeText(input, '  ');
    expect(sendButton.props.accessibilityState.disabled).toBeTruthy();
  });
}); 