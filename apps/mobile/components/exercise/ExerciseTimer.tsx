import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../theme';

interface ExerciseTimerProps {
  onTimeUpdate?: (time: number) => void;
  initialTime?: number;
  autoStart?: boolean;
}

export function ExerciseTimer({
  onTimeUpdate,
  initialTime = 0,
  autoStart = false,
}: ExerciseTimerProps) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const pad = (num: number) => num.toString().padStart(2, '0');

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
    }
    return `${pad(minutes)}:${pad(remainingSeconds)}`;
  }, []);

  const startTimer = useCallback(() => {
    if (!isRunning) {
      const id = setInterval(() => {
        setTime(prev => {
          const newTime = prev + 1;
          onTimeUpdate?.(newTime);
          return newTime;
        });
      }, 1000);
      setIntervalId(id);
      setIsRunning(true);
    }
  }, [isRunning, onTimeUpdate]);

  const stopTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsRunning(false);
  }, [intervalId]);

  const resetTimer = useCallback(() => {
    stopTimer();
    setTime(initialTime);
    onTimeUpdate?.(initialTime);
  }, [stopTimer, initialTime, onTimeUpdate]);

  useEffect(() => {
    if (autoStart) {
      startTimer();
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoStart, startTimer, intervalId]);

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(time)}</Text>
      <View style={styles.controls}>
        {isRunning ? (
          <TouchableOpacity onPress={stopTimer} style={styles.button}>
            <Ionicons name="pause" size={24} color={colors.primary.red} />
            <Text style={styles.buttonText}>일시정지</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startTimer} style={styles.button}>
            <Ionicons name="play" size={24} color={colors.primary.green} />
            <Text style={styles.buttonText}>시작</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={resetTimer} style={styles.button}>
          <Ionicons name="refresh" size={24} color={colors.neutral[600]} />
          <Text style={styles.buttonText}>초기화</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.md,
  },
  time: {
    ...typography.h1,
    fontVariant: ['tabular-nums'],
    color: colors.primary.red,
    marginBottom: spacing.md,
  },
  controls: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    alignItems: 'center',
    padding: spacing.sm,
  },
  buttonText: {
    ...typography.caption,
    color: colors.neutral[600],
    marginTop: spacing.xs,
  },
}); 