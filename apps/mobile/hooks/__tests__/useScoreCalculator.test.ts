import { renderHook, act } from '@testing-library/react-hooks';
import { useScoreCalculator } from '../useScoreCalculator';

describe('useScoreCalculator', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useScoreCalculator());
    
    expect(result.current.score).toBe(0);
    expect(result.current.progress).toBe(0);
  });

  it('calculates score based on exercise progress', () => {
    const { result } = renderHook(() => useScoreCalculator());
    
    act(() => {
      result.current.updateProgress(50);
    });

    expect(result.current.score).toBe(50);
    expect(result.current.progress).toBe(50);
  });

  it('applies multiplier to score calculation', () => {
    const { result } = renderHook(() => useScoreCalculator({ multiplier: 2 }));
    
    act(() => {
      result.current.updateProgress(50);
    });

    expect(result.current.score).toBe(100);
    expect(result.current.progress).toBe(50);
  });

  it('caps progress at 100', () => {
    const { result } = renderHook(() => useScoreCalculator());
    
    act(() => {
      result.current.updateProgress(120);
    });

    expect(result.current.score).toBe(100);
    expect(result.current.progress).toBe(100);
  });

  it('resets score and progress', () => {
    const { result } = renderHook(() => useScoreCalculator());
    
    act(() => {
      result.current.updateProgress(50);
      result.current.reset();
    });

    expect(result.current.score).toBe(0);
    expect(result.current.progress).toBe(0);
  });

  it('calls onScoreUpdate when score changes', () => {
    const onScoreUpdate = jest.fn();
    const { result } = renderHook(() => useScoreCalculator({ onScoreUpdate }));
    
    act(() => {
      result.current.updateProgress(50);
    });

    expect(onScoreUpdate).toHaveBeenCalledWith(50);
  });
}); 