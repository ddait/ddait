import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { CompetitionSession } from './CompetitionSession';

jest.useFakeTimers();

describe('CompetitionSession', () => {
  const mockOnComplete = jest.fn();
  const mockOnGiveUp = jest.fn();
  const mockOpponent = {
    name: '홍길동',
    level: 5,
    currentScore: 0,
  };

  beforeEach(() => {
    mockOnComplete.mockClear();
    mockOnGiveUp.mockClear();
    jest.clearAllTimers();
  });

  it('starts competition when ready button is pressed', () => {
    const { getByTestId, queryByTestId } = render(
      <CompetitionSession
        opponent={mockOpponent}
        onComplete={mockOnComplete}
        onGiveUp={mockOnGiveUp}
      />
    );

    expect(queryByTestId('ready-button')).toBeTruthy();
    fireEvent.press(getByTestId('ready-button'));
    expect(queryByTestId('ready-button')).toBeFalsy();
    expect(getByTestId('timer')).toHaveTextContent('03:00');
  });

  it('updates score when exercise progress changes', () => {
    const { getByTestId } = render(
      <CompetitionSession
        opponent={mockOpponent}
        onComplete={mockOnComplete}
        onGiveUp={mockOnGiveUp}
      />
    );

    fireEvent.press(getByTestId('ready-button'));
    
    act(() => {
      // 운동 진행률 업데이트 시뮬레이션
      const progressBar = getByTestId('progress-bar');
      fireEvent(progressBar, 'progressUpdate', 50);
    });

    expect(getByTestId('score-board')).toHaveTextContent('50'); // 내 점수
  });

  it('completes competition when time is up', () => {
    const { getByTestId, queryByTestId } = render(
      <CompetitionSession
        opponent={mockOpponent}
        onComplete={mockOnComplete}
        onGiveUp={mockOnGiveUp}
      />
    );

    fireEvent.press(getByTestId('ready-button'));
    
    act(() => {
      jest.advanceTimersByTime(180000); // 3분 경과
    });

    expect(mockOnComplete).toHaveBeenCalled();
    expect(queryByTestId('result-display')).toBeTruthy();
  });

  it('gives up competition when give up button is pressed', () => {
    const { getByTestId } = render(
      <CompetitionSession
        opponent={mockOpponent}
        onComplete={mockOnComplete}
        onGiveUp={mockOnGiveUp}
      />
    );

    fireEvent.press(getByTestId('ready-button'));
    fireEvent.press(getByTestId('give-up-button'));

    expect(mockOnGiveUp).toHaveBeenCalled();
  });
}); 