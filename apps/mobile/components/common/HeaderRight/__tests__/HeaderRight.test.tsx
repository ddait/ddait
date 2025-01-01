import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { HeaderRight } from '../HeaderRight';
import { useRouter } from 'expo-router';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('HeaderRight', () => {
  it('renders without badges when no unread items', () => {
    const { queryByText } = render(<HeaderRight />);
    
    expect(queryByText('99+')).toBeNull();
  });

  it('renders chat badge with correct count', () => {
    const { getByText } = render(<HeaderRight unreadChats={5} />);
    
    expect(getByText('5')).toBeTruthy();
  });

  it('renders notification badge with correct count', () => {
    const { getByText } = render(<HeaderRight unreadNotifications={10} />);
    
    expect(getByText('10')).toBeTruthy();
  });

  it('shows 99+ when unread count exceeds 99', () => {
    const { getAllByText } = render(
      <HeaderRight unreadChats={100} unreadNotifications={150} />
    );
    
    const badges = getAllByText('99+');
    expect(badges).toHaveLength(2);
  });

  it('navigates to chat when chat icon is pressed', () => {
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const { getByTestId } = render(<HeaderRight />);
    fireEvent.press(getByTestId('chat-button'));

    expect(mockRouter.push).toHaveBeenCalledWith('/(tabs)/social/chat');
  });

  it('navigates to notifications when notification icon is pressed', () => {
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const { getByTestId } = render(<HeaderRight />);
    fireEvent.press(getByTestId('notification-button'));

    expect(mockRouter.push).toHaveBeenCalledWith('/(tabs)/social/notifications');
  });
}); 