import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MatchingCard } from './MatchingCard';

describe('MatchingCard', () => {
  const mockOnStart = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    mockOnStart.mockClear();
    mockOnCancel.mockClear();
  });

  it('renders correctly with initial state', () => {
    const { getByText, getByTestId } = render(
      <MatchingCard
        onStart={mockOnStart}
        onCancel={mockOnCancel}
      />
    );

    expect(getByTestId('matching-card')).toBeTruthy();
    expect(getByText('1:1 매칭')).toBeTruthy();
    expect(getByText('매칭 시작')).toBeTruthy();
  });

  it('shows loading state when matching is in progress', () => {
    const { getByTestId, queryByText } = render(
      <MatchingCard
        onStart={mockOnStart}
        onCancel={mockOnCancel}
        isMatching={true}
      />
    );

    expect(getByTestId('matching-indicator')).toBeTruthy();
    expect(queryByText('매칭 시작')).toBeNull();
    expect(getByTestId('cancel-button')).toBeTruthy();
  });

  it('calls onStart when start button is pressed', () => {
    const { getByText } = render(
      <MatchingCard
        onStart={mockOnStart}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.press(getByText('매칭 시작'));
    expect(mockOnStart).toHaveBeenCalled();
  });

  it('calls onCancel when cancel button is pressed during matching', () => {
    const { getByTestId } = render(
      <MatchingCard
        onStart={mockOnStart}
        onCancel={mockOnCancel}
        isMatching={true}
      />
    );

    fireEvent.press(getByTestId('cancel-button'));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('displays estimated wait time when provided', () => {
    const { getByText } = render(
      <MatchingCard
        onStart={mockOnStart}
        onCancel={mockOnCancel}
        isMatching={true}
        estimatedWaitTime="약 1분"
      />
    );

    expect(getByText('예상 대기 시간: 약 1분')).toBeTruthy();
  });

  it('shows error message when matching fails', () => {
    const { getByText } = render(
      <MatchingCard
        onStart={mockOnStart}
        onCancel={mockOnCancel}
        error="매칭에 실패했습니다. 다시 시도해주세요."
      />
    );

    expect(getByText('매칭에 실패했습니다. 다시 시도해주세요.')).toBeTruthy();
  });
}); 