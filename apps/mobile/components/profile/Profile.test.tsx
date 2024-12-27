import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Profile } from './Profile';

const mockUser = {
  id: '1',
  name: '홍길동',
  email: 'hong@example.com',
  profileImage: 'https://example.com/profile.jpg',
  workoutCount: 42,
  competitionCount: 15,
  winCount: 8,
};

describe('Profile', () => {
  it('renders user information correctly', () => {
    const { getByText, getByTestId } = render(<Profile user={mockUser} />);

    expect(getByText('홍길동')).toBeTruthy();
    expect(getByText('hong@example.com')).toBeTruthy();
    expect(getByTestId('profile-image')).toBeTruthy();
  });

  it('displays workout statistics', () => {
    const { getByText } = render(<Profile user={mockUser} />);

    expect(getByText('42')).toBeTruthy(); // 운동 횟수
    expect(getByText('15')).toBeTruthy(); // 경쟁 횟수
    expect(getByText('8')).toBeTruthy(); // 승리 횟수
  });

  it('handles edit profile button press', () => {
    const mockOnEdit = jest.fn();
    const { getByText } = render(<Profile user={mockUser} onEdit={mockOnEdit} />);

    fireEvent.press(getByText('프로필 수정'));
    expect(mockOnEdit).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    const { getByTestId } = render(<Profile isLoading={true} />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('shows error state', () => {
    const { getByText } = render(<Profile error="프로필을 불러오는데 실패했습니다." />);
    expect(getByText('프로필을 불러오는데 실패했습니다.')).toBeTruthy();
  });
}); 