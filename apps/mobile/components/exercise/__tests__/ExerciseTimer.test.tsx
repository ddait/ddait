import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { ExerciseTimer } from '../ExerciseTimer/index';

jest.useFakeTimers();

describe('ExerciseTimer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const onTimeUpdate = jest.fn();
    const { getByTestId } = render(<ExerciseTimer onTimeUpdate={onTimeUpdate} />);
    
    expect(getByTestId('exercise-timer')).toBeTruthy();
    expect(getByTestId('timer-display')).toHaveTextContent('00:00');
  });

  it('starts timer when start button is pressed', () => {
    const onTimeUpdate = jest.fn();
    const { getByTestId } = render(<ExerciseTimer onTimeUpdate={onTimeUpdate} />);
    
    fireEvent.press(getByTestId('start-button'));
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(onTimeUpdate).toHaveBeenCalledWith(1);
    expect(getByTestId('timer-display')).toHaveTextContent('00:01');
  });

  it('pauses and resumes timer', () => {
    const onTimeUpdate = jest.fn();
    const { getByTestId } = render(<ExerciseTimer onTimeUpdate={onTimeUpdate} />);
    
    // Start timer
    fireEvent.press(getByTestId('start-button'));
    
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    // Pause timer
    fireEvent.press(getByTestId('pause-button'));
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Time should not increase while paused
    expect(getByTestId('timer-display')).toHaveTextContent('00:02');
    
    // Resume timer
    fireEvent.press(getByTestId('resume-button'));
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(getByTestId('timer-display')).toHaveTextContent('00:03');
  });

  it('stops and resets timer', () => {
    const onTimeUpdate = jest.fn();
    const { getByTestId } = render(<ExerciseTimer onTimeUpdate={onTimeUpdate} />);
    
    // Start and advance timer
    fireEvent.press(getByTestId('start-button'));
    
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    // Stop timer
    fireEvent.press(getByTestId('stop-button'));
    
    expect(getByTestId('timer-display')).toHaveTextContent('00:00');
    expect(getByTestId('start-button')).toBeTruthy();
  });

  it('formats time correctly', () => {
    const onTimeUpdate = jest.fn();
    const { getByTestId } = render(
      <ExerciseTimer 
        onTimeUpdate={onTimeUpdate}
        initialTime={3600} // 1 hour
      />
    );
    
    expect(getByTestId('timer-display')).toHaveTextContent('01:00:00');
  });

  it('handles target time completion', () => {
    const onTimeUpdate = jest.fn();
    const onComplete = jest.fn();
    const { getByTestId } = render(
      <ExerciseTimer 
        onTimeUpdate={onTimeUpdate}
        onComplete={onComplete}
        targetTime={2}
      />
    );
    
    fireEvent.press(getByTestId('start-button'));
    
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    expect(onComplete).toHaveBeenCalled();
  });

  it('starts automatically when autoStart is true', () => {
    const onTimeUpdate = jest.fn();
    render(
      <ExerciseTimer 
        onTimeUpdate={onTimeUpdate}
        autoStart
      />
    );
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(onTimeUpdate).toHaveBeenCalledWith(1);
  });

  it('shows/hides controls based on showControls prop', () => {
    const onTimeUpdate = jest.fn();
    const { queryByTestId, rerender } = render(
      <ExerciseTimer 
        onTimeUpdate={onTimeUpdate}
        showControls={false}
      />
    );
    
    expect(queryByTestId('start-button')).toBeNull();
    
    rerender(
      <ExerciseTimer 
        onTimeUpdate={onTimeUpdate}
        showControls={true}
      />
    );
    
    expect(queryByTestId('start-button')).toBeTruthy();
  });
}); 