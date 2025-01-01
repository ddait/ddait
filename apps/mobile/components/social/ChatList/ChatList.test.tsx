import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ChatList from './ChatList';
import { IChatRoom } from './types';

describe('ChatList', () => {
  it('renders loading state initially', () => {
    render(<ChatList isLoading />);
    expect(screen.getByTestId('chat-list-loading')).toBeTruthy();
  });

  it('renders empty state when no chats', () => {
    render(<ChatList chatRooms={[]} />);
    expect(screen.getByTestId('chat-list-empty')).toBeTruthy();
  });

  it('renders chat rooms when data is provided', () => {
    const mockChatRooms: IChatRoom[] = [
      {
        id: '1',
        name: 'John Doe',
        lastMessage: 'Hello there!',
        lastMessageTime: new Date().toISOString(),
        unreadCount: 2,
        participants: ['user1', 'user2'],
      },
      {
        id: '2',
        name: 'Exercise Group',
        lastMessage: 'Great workout today!',
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0,
        participants: ['user1', 'user2', 'user3'],
      },
    ];

    render(<ChatList chatRooms={mockChatRooms} />);
    expect(screen.getAllByTestId('chat-list-item')).toHaveLength(2);
  });

  it('handles chat room selection', () => {
    const onChatRoomPress = jest.fn();
    const mockChatRoom: IChatRoom = {
      id: '1',
      name: 'John Doe',
      lastMessage: 'Hello there!',
      lastMessageTime: new Date().toISOString(),
      unreadCount: 2,
      participants: ['user1', 'user2'],
    };

    render(
      <ChatList
        chatRooms={[mockChatRoom]}
        onChatRoomPress={onChatRoomPress}
      />
    );

    fireEvent.press(screen.getByTestId('chat-list-item'));
    expect(onChatRoomPress).toHaveBeenCalledWith(mockChatRoom);
  });

  it('handles refresh action', () => {
    const onRefresh = jest.fn();
    render(<ChatList onRefresh={onRefresh} />);
    
    const flatList = screen.getByTestId('chat-list');
    fireEvent.scroll(flatList, {
      nativeEvent: {
        contentOffset: { y: -100 },
        contentSize: { height: 500, width: 100 },
        layoutMeasurement: { height: 100, width: 100 }
      }
    });
    
    expect(onRefresh).toHaveBeenCalled();
  });

  it('handles load more action', () => {
    const onLoadMore = jest.fn();
    const mockChatRooms: IChatRoom[] = Array(10).fill(null).map((_, index) => ({
      id: String(index),
      name: `Chat Room ${index}`,
      lastMessage: `Message ${index}`,
      lastMessageTime: new Date().toISOString(),
      unreadCount: index % 2,
      participants: ['user1', 'user2'],
    }));

    render(
      <ChatList
        chatRooms={mockChatRooms}
        onLoadMore={onLoadMore}
      />
    );

    const flatList = screen.getByTestId('chat-list');
    fireEvent.scroll(flatList, {
      nativeEvent: {
        contentOffset: { y: 500 },
        contentSize: { height: 1000, width: 100 },
        layoutMeasurement: { height: 100, width: 100 }
      }
    });

    expect(onLoadMore).toHaveBeenCalled();
  });
}); 