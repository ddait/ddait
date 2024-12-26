import React from 'react';
import { Alert, AlertButton } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { useLocalSearchParams } from 'expo-router';
import FriendProfileScreen from '../index';
import { useFriend } from '@/hooks/useFriend';

// Mock expo-router
jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(),
  Stack: {
    Screen: () => null,
  },
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

// Mock Alert
jest.spyOn(Alert, 'alert').mockImplementation((title: string, message?: string, buttons?: AlertButton[]) => {
  // Simulate pressing the "삭제" button
  buttons?.[1].onPress?.();
});

// Mock useFriend hook
jest.mock('@/hooks/useFriend', () => ({
  useFriend: jest.fn(),
}));

const mockFriend = {
  id: '1',
  name: '홍길동',
  status: 'online',
  profileImage: 'https://example.com/1.jpg',
  workoutStats: {
    totalWorkouts: 42,
    totalMinutes: 1260,
    favoriteExercise: '벤치프레스',
  },
};

describe('FriendProfileScreen', () => {
  beforeEach(() => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ id: '1' });
    (useFriend as jest.Mock).mockReturnValue({
      friend: mockFriend,
      isLoading: false,
      error: null,
      removeFriend: jest.fn(),
    });
  });

  it('renders loading state', () => {
    (useFriend as jest.Mock).mockReturnValue({
      friend: null,
      isLoading: true,
      error: null,
      removeFriend: jest.fn(),
    });

    const { getByTestId } = render(<FriendProfileScreen />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders friend profile information', () => {
    const { getByText, getByTestId } = render(<FriendProfileScreen />);
    
    expect(getByText('홍길동')).toBeTruthy();
    expect(getByTestId('profile-image')).toBeTruthy();
    expect(getByText('총 운동 횟수: 42회')).toBeTruthy();
    expect(getByText('총 운동 시간: 21시간')).toBeTruthy();
    expect(getByText('가장 좋아하는 운동: 벤치프레스')).toBeTruthy();
  });

  it('renders error state', () => {
    (useFriend as jest.Mock).mockReturnValue({
      friend: null,
      isLoading: false,
      error: new Error('Failed to load friend'),
      removeFriend: jest.fn(),
    });

    const { getByText } = render(<FriendProfileScreen />);
    expect(getByText('친구 정보를 불러오는데 실패했습니다.')).toBeTruthy();
  });

  it('handles chat button press', () => {
    const { getByText } = render(<FriendProfileScreen />);
    const chatButton = getByText('1:1 대화');
    
    fireEvent.press(chatButton);
    // TODO: Add chat navigation test when chat feature is implemented
  });

  it('handles remove friend button press', () => {
    const mockRemoveFriend = jest.fn().mockResolvedValue(undefined);
    (useFriend as jest.Mock).mockReturnValue({
      friend: mockFriend,
      isLoading: false,
      error: null,
      removeFriend: mockRemoveFriend,
    });

    const { getByText } = render(<FriendProfileScreen />);
    const removeButton = getByText('친구 삭제');
    
    fireEvent.press(removeButton);
    expect(mockRemoveFriend).toHaveBeenCalledWith('1');
  });
}); 