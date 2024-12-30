import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import FriendsList from './FriendsList';
import { IFriend, IFriendRequest } from './types';

describe('FriendsList', () => {
  it('renders loading state initially', () => {
    render(<FriendsList isLoading />);
    expect(screen.getByTestId('friends-list-loading')).toBeTruthy();
  });

  it('renders empty state when no friends', () => {
    render(<FriendsList friends={[]} />);
    expect(screen.getByTestId('friends-list-empty')).toBeTruthy();
  });

  it('renders friends list when data is provided', () => {
    const mockFriends: IFriend[] = [
      {
        id: '1',
        name: 'John Doe',
        avatar: 'https://example.com/avatar1.jpg',
        isOnline: true,
        lastActive: new Date().toISOString(),
        recentActivity: 'Completed a workout',
      },
      {
        id: '2',
        name: 'Jane Smith',
        avatar: 'https://example.com/avatar2.jpg',
        isOnline: false,
        lastActive: new Date().toISOString(),
        recentActivity: 'Won a competition',
      },
    ];

    render(<FriendsList friends={mockFriends} />);
    expect(screen.getAllByTestId('friend-card')).toHaveLength(2);
  });

  it('handles friend search', () => {
    const mockFriends: IFriend[] = [
      {
        id: '1',
        name: 'John Doe',
        avatar: 'https://example.com/avatar1.jpg',
        isOnline: true,
        lastActive: new Date().toISOString(),
        recentActivity: 'Completed a workout',
      },
      {
        id: '2',
        name: 'Jane Smith',
        avatar: 'https://example.com/avatar2.jpg',
        isOnline: false,
        lastActive: new Date().toISOString(),
        recentActivity: 'Won a competition',
      },
    ];

    render(<FriendsList friends={mockFriends} />);
    const searchInput = screen.getByTestId('friends-search-input');
    fireEvent.changeText(searchInput, 'John');
    
    expect(screen.getAllByTestId('friend-card')).toHaveLength(1);
    expect(screen.getByText('John Doe')).toBeTruthy();
  });

  it('handles friend requests', () => {
    const onAcceptRequest = jest.fn();
    const onRejectRequest = jest.fn();
    const mockRequests: IFriendRequest[] = [
      {
        id: '1',
        userId: 'user1',
        name: 'Alice Brown',
        avatar: 'https://example.com/avatar3.jpg',
        requestTime: new Date().toISOString(),
      },
    ];

    render(
      <FriendsList
        friendRequests={mockRequests}
        onAcceptRequest={onAcceptRequest}
        onRejectRequest={onRejectRequest}
      />
    );

    fireEvent.press(screen.getByTestId('accept-request-button-1'));
    expect(onAcceptRequest).toHaveBeenCalledWith('1');

    fireEvent.press(screen.getByTestId('reject-request-button-1'));
    expect(onRejectRequest).toHaveBeenCalledWith('1');
  });

  it('handles refresh action', () => {
    const onRefresh = jest.fn();
    render(<FriendsList onRefresh={onRefresh} />);
    
    const flatList = screen.getByTestId('friends-list');
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
    const mockFriends: IFriend[] = Array(10).fill(null).map((_, index) => ({
      id: String(index),
      name: `Friend ${index}`,
      avatar: `https://example.com/avatar${index}.jpg`,
      isOnline: index % 2 === 0,
      lastActive: new Date().toISOString(),
      recentActivity: `Activity ${index}`,
    }));

    render(
      <FriendsList
        friends={mockFriends}
        onLoadMore={onLoadMore}
      />
    );

    const flatList = screen.getByTestId('friends-list');
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