import { useCallback, useState } from 'react';

interface UseScoreCalculatorProps {
  multiplier?: number;
  onScoreUpdate?: (score: number) => void;
}

interface UseScoreCalculatorReturn {
  score: number;
  progress: number;
  updateProgress: (progress: number) => void;
  reset: () => void;
}

export function useScoreCalculator({
  multiplier = 1,
  onScoreUpdate,
}: UseScoreCalculatorProps = {}): UseScoreCalculatorReturn {
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback((newProgress: number) => {
    const clampedProgress = Math.min(Math.max(newProgress, 0), 100);
    setProgress(clampedProgress);
    
    const newScore = Math.floor(clampedProgress * multiplier);
    setScore(newScore);
    onScoreUpdate?.(newScore);
  }, [multiplier, onScoreUpdate]);

  const reset = useCallback(() => {
    setScore(0);
    setProgress(0);
  }, []);

  return {
    score,
    progress,
    updateProgress,
    reset,
  };
} 