import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Notifications from './Notifications';
import { INotification } from './types';

describe('Notifications', () => {
  it('renders loading state initially', () => {
    render(<Notifications />);
    expect(screen.getByTestId('notifications-loading')).toBeTruthy();
  });

  it('renders empty state when no notifications', () => {
    render(<Notifications notifications={[]} />);
    expect(screen.getByTestId('notifications-empty')).toBeTruthy();
  });

  it('renders notification items when data is provided', () => {
    const mockNotifications: INotification[] = [
      {
        id: '1',
        type: 'friend_request',
        message: 'John sent you a friend request',
        isRead: false,
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        type: 'competition',
        message: 'New competition invitation',
        isRead: true,
        timestamp: new Date().toISOString(),
      },
    ];

    render(<Notifications notifications={mockNotifications} />);
    expect(screen.getAllByTestId('notification-item')).toHaveLength(2);
  });

  it('handles notification press', () => {
    const onNotificationPress = jest.fn();
    const mockNotification: INotification = {
      id: '1',
      type: 'friend_request',
      message: 'John sent you a friend request',
      isRead: false,
      timestamp: new Date().toISOString(),
    };

    render(
      <Notifications
        notifications={[mockNotification]}
        onNotificationPress={onNotificationPress}
      />
    );

    fireEvent.press(screen.getByTestId('notification-item'));
    expect(onNotificationPress).toHaveBeenCalledWith(mockNotification);
  });
}); 