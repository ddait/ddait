import { act, renderHook } from '@testing-library/react-hooks';
import { useCompetitionSessionStore } from '../competitionSessionStore';

describe('useCompetitionSessionStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useCompetitionSessionStore());
    act(() => {
      result.current.reset();
    });
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useCompetitionSessionStore());
    
    expect(result.current.myScore).toBe(0);
    expect(result.current.opponentScore).toBe(0);
    expect(result.current.remainingTime).toBe(180);
    expect(result.current.progress).toBe(0);
    expect(result.current.status).toBe('ready');
  });

  it('starts session correctly', () => {
    const { result } = renderHook(() => useCompetitionSessionStore());
    
    act(() => {
      result.current.startSession();
    });

    expect(result.current.status).toBe('in_progress');
  });

  it('updates score correctly', () => {
    const { result } = renderHook(() => useCompetitionSessionStore());
    
    act(() => {
      result.current.updateMyScore(50);
    });

    expect(result.current.myScore).toBe(50);
  });

  it('updates progress correctly', () => {
    const { result } = renderHook(() => useCompetitionSessionStore());
    
    act(() => {
      result.current.updateProgress(75);
    });

    expect(result.current.progress).toBe(75);
  });

  it('completes session when time is up', () => {
    const { result } = renderHook(() => useCompetitionSessionStore());
    
    act(() => {
      result.current.startSession();
      result.current.updateRemainingTime(0);
    });

    expect(result.current.status).toBe('completed');
  });

  it('gives up session correctly', () => {
    const { result } = renderHook(() => useCompetitionSessionStore());
    
    act(() => {
      result.current.startSession();
      result.current.giveUp();
    });

    expect(result.current.status).toBe('completed');
  });

  it('resets session state correctly', () => {
    const { result } = renderHook(() => useCompetitionSessionStore());
    
    act(() => {
      result.current.startSession();
      result.current.updateMyScore(100);
      result.current.updateProgress(50);
      result.current.reset();
    });

    expect(result.current.myScore).toBe(0);
    expect(result.current.opponentScore).toBe(0);
    expect(result.current.remainingTime).toBe(180);
    expect(result.current.progress).toBe(0);
    expect(result.current.status).toBe('ready');
  });
}); 