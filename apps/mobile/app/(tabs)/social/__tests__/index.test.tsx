import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SocialScreen from '../index';
import { useFriends } from '@/hooks/useFriends';

jest.mock('@/hooks/useFriends');
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  Stack: {
    Screen: () => null,
  },
}));

describe('SocialScreen', () => {
  const mockFriends = [
    { id: '1', name: '홍길동', profileImage: 'https://example.com/image1.jpg' },
    { id: '2', name: '김철수', profileImage: 'https://example.com/image2.jpg' },
  ];

  const mockUseFriends = useFriends as jest.Mock;

  it('renders loading state initially', () => {
    mockUseFriends.mockReturnValue({
      friends: [],
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    const { getByTestId } = render(<SocialScreen />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders friend list when data is loaded', async () => {
    mockUseFriends.mockReturnValue({
      friends: mockFriends,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByText } = render(<SocialScreen />);
    await waitFor(() => {
      expect(getByText('홍길동')).toBeTruthy();
      expect(getByText('김철수')).toBeTruthy();
    });
  });

  it('renders error state when loading fails', () => {
    mockUseFriends.mockReturnValue({
      friends: [],
      isLoading: false,
      error: new Error('Failed to load friends'),
      refetch: jest.fn(),
    });

    const { getByText, getByTestId } = render(<SocialScreen />);
    expect(getByText('친구 목록을 불러오는데 실패했습니다.')).toBeTruthy();
    expect(getByTestId('retry-button')).toBeTruthy();
  });

  it('handles retry button press', () => {
    const mockRefetch = jest.fn();
    mockUseFriends.mockReturnValue({
      friends: [],
      isLoading: false,
      error: new Error('Failed to load friends'),
      refetch: mockRefetch,
    });

    const { getByTestId } = render(<SocialScreen />);
    fireEvent.press(getByTestId('retry-button'));
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('handles pull-to-refresh', async () => {
    const mockRefetch = jest.fn();
    mockUseFriends.mockReturnValue({
      friends: mockFriends,
      isLoading: false,
      error: null,
      refetch: mockRefetch,
    });

    const { getByTestId } = render(<SocialScreen />);
    const refreshControl = getByTestId('friend-list').props.refreshControl;
    refreshControl.props.onRefresh();

    expect(mockRefetch).toHaveBeenCalled();
  });
}); 