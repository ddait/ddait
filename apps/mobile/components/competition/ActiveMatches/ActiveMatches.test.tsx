import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ActiveMatches } from './ActiveMatches';
import { IActiveMatch } from './types';

const mockMatches: IActiveMatch[] = [
  {
    id: '1',
    type: 'oneOnOne',
    participants: [
      { id: 'user1', name: '사용자 1', score: 100 },
      { id: 'user2', name: '사용자 2', score: 80 },
    ],
    startTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30분 전
    endTime: new Date(Date.now() + 1000 * 60 * 30).toISOString(), // 30분 후
    status: 'inProgress',
  },
];

describe('ActiveMatches', () => {
  const mockOnMatchPress = jest.fn();

  beforeEach(() => {
    mockOnMatchPress.mockClear();
  });

  it('renders loading state correctly', () => {
    const { getByText } = render(
      <ActiveMatches matches={[]} isLoading onMatchPress={mockOnMatchPress} />
    );

    expect(getByText('진행중인 매치')).toBeTruthy();
  });

  it('renders empty state correctly', () => {
    const { getByText } = render(
      <ActiveMatches matches={[]} onMatchPress={mockOnMatchPress} />
    );

    expect(getByText('현재 진행중인 매치가 없습니다')).toBeTruthy();
  });

  it('renders matches correctly', () => {
    const { getByText, getByTestId } = render(
      <ActiveMatches matches={mockMatches} onMatchPress={mockOnMatchPress} />
    );

    expect(getByText('1:1 대결')).toBeTruthy();
    expect(getByText('사용자 1')).toBeTruthy();
    expect(getByText('사용자 2')).toBeTruthy();
    expect(getByText('100')).toBeTruthy();
    expect(getByText('80')).toBeTruthy();
  });

  it('calls onMatchPress when a match is pressed', () => {
    const { getByTestId } = render(
      <ActiveMatches matches={mockMatches} onMatchPress={mockOnMatchPress} />
    );

    fireEvent.press(getByTestId('active-match-card'));
    expect(mockOnMatchPress).toHaveBeenCalledWith('1');
  });

  it('shows remaining time correctly', () => {
    const { getByText } = render(
      <ActiveMatches matches={mockMatches} onMatchPress={mockOnMatchPress} />
    );

    expect(getByText('30분 남음')).toBeTruthy();
  });
}); 