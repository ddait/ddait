import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { ExerciseTimer } from '../ExerciseTimer';

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

describe('ExerciseTimer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
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

  it('pauses and resumes timer correctly', () => {
    const onTimeUpdate = jest.fn();
    const onPause = jest.fn();
    const onResume = jest.fn();
    
    const { getByTestId } = render(
      <ExerciseTimer
        onTimeUpdate={onTimeUpdate}
        onPause={onPause}
        onResume={onResume}
      />
    );
    
    // Start timer
    fireEvent.press(getByTestId('start-button'));
    
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    // Pause timer
    fireEvent.press(getByTestId('pause-button'));
    expect(onPause).toHaveBeenCalled();
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Time should not increase while paused
    expect(getByTestId('timer-display')).toHaveTextContent('00:02');
    
    // Resume timer
    fireEvent.press(getByTestId('resume-button'));
    expect(onResume).toHaveBeenCalled();
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(getByTestId('timer-display')).toHaveTextContent('00:03');
  });

  it('stops timer and resets to zero when stop button is pressed', () => {
    const onTimeUpdate = jest.fn();
    const { getByTestId } = render(<ExerciseTimer onTimeUpdate={onTimeUpdate} />);
    
    // Start timer
    fireEvent.press(getByTestId('start-button'));
    
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    // Stop timer
    fireEvent.press(getByTestId('stop-button'));
    
    expect(getByTestId('timer-display')).toHaveTextContent('00:00');
  });

  it('calls onComplete when target time is reached', () => {
    const onTimeUpdate = jest.fn();
    const onComplete = jest.fn();
    
    render(
      <ExerciseTimer
        onTimeUpdate={onTimeUpdate}
        targetTime={3}
        onComplete={onComplete}
        autoStart
      />
    );
    
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    expect(onComplete).toHaveBeenCalled();
  });

  it('formats time correctly in 24h format', () => {
    const onTimeUpdate = jest.fn();
    const { getByTestId } = render(
      <ExerciseTimer
        onTimeUpdate={onTimeUpdate}
        initialTime={3661} // 1 hour, 1 minute, 1 second
        format="24h"
      />
    );
    
    expect(getByTestId('timer-display')).toHaveTextContent('01:01:01');
  });

  it('starts automatically when autoStart is true', () => {
    const onTimeUpdate = jest.fn();
    render(<ExerciseTimer onTimeUpdate={onTimeUpdate} autoStart />);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(onTimeUpdate).toHaveBeenCalledWith(1);
  });

  it('hides controls when showControls is false', () => {
    const onTimeUpdate = jest.fn();
    const { queryByTestId } = render(
      <ExerciseTimer onTimeUpdate={onTimeUpdate} showControls={false} />
    );
    
    expect(queryByTestId('start-button')).toBeNull();
  });
}); 