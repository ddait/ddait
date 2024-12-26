import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FriendList } from './FriendList';
import type { Friend, FriendStatus } from '../FriendCard/types';

const mockFriends: Friend[] = [
  {
    id: '1',
    name: 'Friend 1',
    status: 'offline' as FriendStatus,
    profileImage: 'https://example.com/1.jpg',
  },
  {
    id: '2',
    name: 'Friend 2',
    status: 'online' as FriendStatus,
    profileImage: 'https://example.com/2.jpg',
  },
  {
    id: '3',
    name: 'Friend 3',
    status: 'exercising' as FriendStatus,
    profileImage: 'https://example.com/3.jpg',
  },
];

describe('FriendList', () => {
  it('renders all friends in the list', () => {
    const { getAllByTestId } = render(
      <FriendList
        friends={mockFriends}
        onFriendPress={() => {}}
        testID="friend-list"
      />,
    );

    const friendCards = getAllByTestId(/friend-card/);
    expect(friendCards).toHaveLength(3);
  });

  it('displays empty state when no friends', () => {
    const { getByText } = render(
      <FriendList friends={[]} onFriendPress={() => {}} testID="friend-list" />,
    );

    expect(getByText('아직 친구가 없습니다.')).toBeTruthy();
  });

  it('handles friend press correctly', () => {
    const mockPress = jest.fn();
    const { getAllByTestId } = render(
      <FriendList
        friends={mockFriends}
        onFriendPress={mockPress}
        testID="friend-list"
      />,
    );

    const friendCards = getAllByTestId(/friend-card/);
    fireEvent.press(friendCards[0]);

    expect(mockPress).toHaveBeenCalledWith(mockFriends[1]);
  });

  it('sorts friends by status (online/exercising first)', () => {
    const { getAllByTestId } = render(
      <FriendList
        friends={mockFriends}
        onFriendPress={() => {}}
        testID="friend-list"
      />,
    );

    const friendCards = getAllByTestId(/friend-card/);
    
    // Check if the order matches the expected status priority
    expect(friendCards[0].props.testID).toBe('friend-card-2'); // online friend
    expect(friendCards[1].props.testID).toBe('friend-card-3'); // exercising friend
    expect(friendCards[2].props.testID).toBe('friend-card-1'); // offline friend
  });
}); 