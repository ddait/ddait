import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MatchHistory } from './MatchHistory';
import { IMatchResult } from './types';

const mockMatches: IMatchResult[] = [
  {
    id: '1',
    type: 'oneOnOne',
    date: new Date().toISOString(),
    duration: 30,
    participants: [
      { id: 'user1', name: '홍길동', score: 100, rank: 1 },
      { id: 'user2', name: '김철수', score: 80, rank: 2 },
    ],
    status: 'win',
    exerciseType: '달리기',
    stats: {
      totalCalories: 300,
      avgHeartRate: 150,
      distance: 5.0,
      pace: 6.5,
    },
  },
];

describe('MatchHistory', () => {
  const mockOnMatchPress = jest.fn();

  beforeEach(() => {
    mockOnMatchPress.mockClear();
  });

  it('renders loading state correctly', () => {
    const { getByTestId } = render(
      <MatchHistory
        matches={[]}
        onMatchPress={mockOnMatchPress}
        isLoading
      />
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders empty state correctly', () => {
    const { getByText } = render(
      <MatchHistory
        matches={[]}
        onMatchPress={mockOnMatchPress}
      />
    );

    expect(getByText('선택한 기간에 진행한 매치가 없습니다')).toBeTruthy();
  });

  it('renders matches correctly', () => {
    const { getByText, getByTestId } = render(
      <MatchHistory
        matches={mockMatches}
        onMatchPress={mockOnMatchPress}
      />
    );

    expect(getByText('1:1 대결')).toBeTruthy();
    expect(getByText('홍길동')).toBeTruthy();
    expect(getByText('100')).toBeTruthy();
    expect(getByTestId('match-history-list')).toBeTruthy();
  });

  it('calls onMatchPress when a match is pressed', () => {
    const { getByTestId } = render(
      <MatchHistory
        matches={mockMatches}
        onMatchPress={mockOnMatchPress}
      />
    );

    fireEvent.press(getByTestId('match-history-card-1'));
    expect(mockOnMatchPress).toHaveBeenCalledWith('1');
  });

  it('displays match stats correctly', () => {
    const { getByText } = render(
      <MatchHistory
        matches={mockMatches}
        onMatchPress={mockOnMatchPress}
      />
    );

    expect(getByText('300')).toBeTruthy(); // 칼로리
    expect(getByText('150')).toBeTruthy(); // 평균 심박수
    expect(getByText('5.0km')).toBeTruthy(); // 거리
    expect(getByText('6′30″')).toBeTruthy(); // 페이스
  });
}); 