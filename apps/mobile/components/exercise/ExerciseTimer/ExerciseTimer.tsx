import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Button } from '../../common/Button';
import { colors } from '../../../theme/colors';
import type { ExerciseTimerProps, TimerState } from './ExerciseTimer.types';

export type { ExerciseTimerProps };

export function ExerciseTimer({
  onTimeUpdate,
  initialTime = 0,
  targetTime,
  format = 'mm:ss',
  autoStart = false,
  showControls = true,
  onComplete,
  onPause,
  onResume,
  hapticFeedback = true,
  style,
}: ExerciseTimerProps) {
  const [time, setTime] = useState(initialTime);
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const intervalRef = useRef<NodeJS.Timeout>();

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (format === '24h' || hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const triggerHaptic = () => {
    if (hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const startTimer = () => {
    triggerHaptic();
    setTimerState('running');
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime + 1;
        onTimeUpdate(newTime);
        
        if (targetTime && newTime >= targetTime) {
          stopTimer();
          setTimerState('completed');
          onComplete?.();
        }
        
        return newTime;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    triggerHaptic();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimerState('paused');
    onPause?.();
  };

  const resumeTimer = () => {
    triggerHaptic();
    setTimerState('running');
    onResume?.();
    startTimer();
  };

  const stopTimer = () => {
    triggerHaptic();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(0);
    setTimerState('idle');
  };

  useEffect(() => {
    if (autoStart) {
      startTimer();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <View testID="exercise-timer" style={[styles.container, style]}>
      <Text testID="timer-display" style={styles.timerText}>
        {formatTime(time)}
      </Text>
      
      {showControls && (
        <View style={styles.controls}>
          {timerState === 'idle' && (
            <Button
              testID="start-button"
              onPress={startTimer}
              variant="primary"
            >
              Start
            </Button>
          )}
          
          {timerState === 'running' && (
            <>
              <Button
                testID="pause-button"
                onPress={pauseTimer}
                variant="secondary"
              >
                Pause
              </Button>
              <Button
                testID="stop-button"
                onPress={stopTimer}
                variant="ghost"
              >
                Stop
              </Button>
            </>
          )}
          
          {timerState === 'paused' && (
            <>
              <Button
                testID="resume-button"
                onPress={resumeTimer}
                variant="primary"
              >
                Resume
              </Button>
              <Button
                testID="stop-button"
                onPress={stopTimer}
                variant="ghost"
              >
                Stop
              </Button>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.gray[900],
    fontVariant: ['tabular-nums'],
  },
  controls: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
}); 