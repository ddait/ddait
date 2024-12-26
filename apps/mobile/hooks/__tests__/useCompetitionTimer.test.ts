import { renderHook, act } from '@testing-library/react-hooks';
import { useCompetitionTimer } from '../useCompetitionTimer';

jest.useFakeTimers();

describe('useCompetitionTimer', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useCompetitionTimer());
    
    expect(result.current.remainingTime).toBe(180);
    expect(result.current.isRunning).toBe(false);
  });

  it('starts timer correctly', () => {
    const { result } = renderHook(() => useCompetitionTimer());
    
    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);
  });

  it('pauses timer correctly', () => {
    const { result } = renderHook(() => useCompetitionTimer());
    
    act(() => {
      result.current.start();
      result.current.pause();
    });

    expect(result.current.isRunning).toBe(false);
  });

  it('decrements time correctly', () => {
    const { result } = renderHook(() => useCompetitionTimer());
    
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.remainingTime).toBe(179);
  });

  it('calls onComplete when time reaches zero', () => {
    const onComplete = jest.fn();
    const { result } = renderHook(() => useCompetitionTimer({ onComplete }));
    
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(180000);
    });

    expect(onComplete).toHaveBeenCalled();
    expect(result.current.remainingTime).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });

  it('resets timer correctly', () => {
    const { result } = renderHook(() => useCompetitionTimer());
    
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(10000);
      result.current.reset();
    });

    expect(result.current.remainingTime).toBe(180);
    expect(result.current.isRunning).toBe(false);
  });
}); 