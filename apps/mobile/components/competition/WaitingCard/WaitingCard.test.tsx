import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { WaitingCard } from './WaitingCard';

describe('WaitingCard', () => {
  const mockOnStart = jest.fn();
  const mockOnCancel = jest.fn();
  const mockOpponent = {
    name: '홍길동',
    level: 5,
    winRate: 60,
  };

  beforeEach(() => {
    mockOnStart.mockClear();
    mockOnCancel.mockClear();
  });

  it('renders correctly with initial state', () => {
    const { getByTestId, getByText } = render(
      <WaitingCard
        onStart={mockOnStart}
        onCancel={mockOnCancel}
      />
    );

    expect(getByTestId('waiting-card')).toBeTruthy();
    expect(getByText('매칭 대기 중')).toBeTruthy();
  });

  it('shows opponent info when matched', () => {
    const { getByText } = render(
      <WaitingCard
        onStart={mockOnStart}
        onCancel={mockOnCancel}
        opponent={mockOpponent}
      />
    );

    expect(getByText('홍길동')).toBeTruthy();
    expect(getByText('Lv.5')).toBeTruthy();
    expect(getByText('승률: 60%')).toBeTruthy();
  });

  it('shows start button when opponent is ready', () => {
    const { getByText } = render(
      <WaitingCard
        onStart={mockOnStart}
        onCancel={mockOnCancel}
        opponent={mockOpponent}
        isOpponentReady={true}
      />
    );

    expect(getByText('대결 시작')).toBeTruthy();
  });

  it('calls onStart when start button is pressed', () => {
    const { getByText } = render(
      <WaitingCard
        onStart={mockOnStart}
        onCancel={mockOnCancel}
        opponent={mockOpponent}
        isOpponentReady={true}
      />
    );

    fireEvent.press(getByText('대결 시작'));
    expect(mockOnStart).toHaveBeenCalled();
  });

  it('calls onCancel when cancel button is pressed', () => {
    const { getByTestId } = render(
      <WaitingCard
        onStart={mockOnStart}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.press(getByTestId('cancel-button'));
    expect(mockOnCancel).toHaveBeenCalled();
  });
}); 