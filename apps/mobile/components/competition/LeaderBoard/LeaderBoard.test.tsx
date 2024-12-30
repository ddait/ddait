import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LeaderBoard } from './LeaderBoard';
import { ILeaderBoardUser } from './types';

const mockUsers: ILeaderBoardUser[] = [
  {
    id: '1',
    name: '홍길동',
    rank: 1,
    score: 1000,
    isCurrentUser: true,
    trend: 'up',
    previousRank: 2,
  },
  {
    id: '2',
    name: '김철수',
    rank: 2,
    score: 950,
    isCurrentUser: false,
    trend: 'down',
    previousRank: 1,
  },
  {
    id: '3',
    name: '이영희',
    rank: 3,
    score: 900,
    isCurrentUser: false,
    trend: 'same',
    previousRank: 3,
  },
];

describe('LeaderBoard', () => {
  const mockOnPeriodChange = jest.fn();

  beforeEach(() => {
    mockOnPeriodChange.mockClear();
  });

  it('renders loading state correctly', () => {
    const { getByTestId } = render(
      <LeaderBoard
        period="weekly"
        users={[]}
        onPeriodChange={mockOnPeriodChange}
        isLoading
      />
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders users list correctly', () => {
    const { getByText, getByTestId } = render(
      <LeaderBoard
        period="weekly"
        users={mockUsers}
        onPeriodChange={mockOnPeriodChange}
      />
    );

    expect(getByTestId('leaderboard-list')).toBeTruthy();
    expect(getByText('홍길동')).toBeTruthy();
    expect(getByText('1000 점')).toBeTruthy();
  });

  it('handles period change correctly', () => {
    const { getByText } = render(
      <LeaderBoard
        period="weekly"
        users={mockUsers}
        onPeriodChange={mockOnPeriodChange}
      />
    );

    fireEvent.press(getByText('월간'));
    expect(mockOnPeriodChange).toHaveBeenCalledWith('monthly');
  });

  it('highlights current user correctly', () => {
    const { getByTestId } = render(
      <LeaderBoard
        period="weekly"
        users={mockUsers}
        onPeriodChange={mockOnPeriodChange}
      />
    );

    const currentUserItem = getByTestId('leaderboard-item-1');
    expect(currentUserItem.props.style).toContainEqual(
      expect.objectContaining({ backgroundColor: expect.any(String) })
    );
  });

  it('displays rank changes correctly', () => {
    const { getByText } = render(
      <LeaderBoard
        period="weekly"
        users={mockUsers}
        onPeriodChange={mockOnPeriodChange}
      />
    );

    expect(getByText('1')).toBeTruthy(); // rank change for first user
  });
}); 