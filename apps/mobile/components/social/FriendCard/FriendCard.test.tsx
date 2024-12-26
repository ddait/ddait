import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FriendCard } from './FriendCard';
import type { Friend } from './types';

describe('FriendCard', () => {
  const mockFriend: Friend = {
    id: '1',
    name: '홍길동',
    status: 'online',
    profileImage: 'https://example.com/profile.jpg',
  };

  const mockOnPress = () => {};

  it('renders friend information correctly', () => {
    const { getByText, getByTestId } = render(
      <FriendCard friend={mockFriend} onPress={mockOnPress} testID="friend-card" />
    );

    expect(getByTestId('friend-card')).toBeTruthy();
    expect(getByText('홍길동')).toBeTruthy();
    expect(getByText('온라인')).toBeTruthy();
  });

  it('displays online status correctly', () => {
    const { getByTestId } = render(
      <FriendCard friend={mockFriend} onPress={mockOnPress} testID="friend-card" />
    );

    const statusIndicator = getByTestId('status-indicator');
    expect(statusIndicator.props.style).toContainEqual(
      expect.objectContaining({ backgroundColor: '#4CAF50' })
    );
  });

  it('displays offline status correctly', () => {
    const offlineFriend: Friend = {
      ...mockFriend,
      status: 'offline',
    };

    const { getByText } = render(
      <FriendCard friend={offlineFriend} onPress={mockOnPress} testID="friend-card" />
    );

    expect(getByText('오프라인')).toBeTruthy();
  });

  it('handles press event correctly', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <FriendCard friend={mockFriend} onPress={onPress} testID="friend-card" />
    );

    fireEvent.press(getByTestId('friend-card'));
    expect(onPress).toHaveBeenCalledWith(mockFriend);
  });
}); 