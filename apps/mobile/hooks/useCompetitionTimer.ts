import { useCallback, useEffect, useRef, useState } from 'react';

interface UseCompetitionTimerProps {
  initialTime?: number;
  onComplete?: () => void;
}

interface UseCompetitionTimerReturn {
  remainingTime: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export function useCompetitionTimer({
  initialTime = 180,
  onComplete,
}: UseCompetitionTimerProps = {}): UseCompetitionTimerReturn {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearTimer();
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isRunning, clearTimer, onComplete]);

  const pause = useCallback(() => {
    clearTimer();
    setIsRunning(false);
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setRemainingTime(initialTime);
  }, [clearTimer, initialTime]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  return {
    remainingTime,
    isRunning,
    start,
    pause,
    reset,
  };
} 