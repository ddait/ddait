import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { ExerciseCardProps, ExerciseStatus, ExerciseType } from './types';
import { ProgressBar } from '../../common/ProgressBar/ProgressBar';
import { IconSymbol } from '../../ui/IconSymbol';

const STATUS_COLORS: Record<ExerciseStatus, string> = {
  active: '#4CAF50',
  paused: '#FFC107',
  completed: '#9E9E9E',
};

const EXERCISE_ICONS: Record<ExerciseType, string> = {
  running: 'run',
  cycling: 'bicycle',
  swimming: 'water',
  walking: 'walk',
  strength: 'barbell',
};

export function ExerciseCard(props: ExerciseCardProps) {
  const {
    title,
    type,
    duration,
    calories,
    status,
    progress = 0,
    variant = 'default',
    style,
    onPress,
  } = props;

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderControls = () => {
    if (status === 'completed') return null;

    if (status === 'active') {
      const { onPause, onStop } = props as { onPause: () => void; onStop: () => void };
      return (
        <View style={styles.controls}>
          <Pressable
            testID="pause-button"
            onPress={onPause}
            style={styles.controlButton}
          >
            <IconSymbol name="pause" size={24} color="#666" />
          </Pressable>
          <Pressable
            testID="stop-button"
            onPress={onStop}
            style={styles.controlButton}
          >
            <IconSymbol name="stop" size={24} color="#666" />
          </Pressable>
        </View>
      );
    }

    if (status === 'paused') {
      const { onResume, onStop } = props as { onResume: () => void; onStop: () => void };
      return (
        <View style={styles.controls}>
          <Pressable
            testID="resume-button"
            onPress={onResume}
            style={styles.controlButton}
          >
            <IconSymbol name="play" size={24} color="#666" />
          </Pressable>
          <Pressable
            testID="stop-button"
            onPress={onStop}
            style={styles.controlButton}
          >
            <IconSymbol name="stop" size={24} color="#666" />
          </Pressable>
        </View>
      );
    }

    return null;
  };

  return (
    <Pressable
      testID="exercise-card"
      style={[
        styles.container,
        variant === 'compact' && styles.compactContainer,
        style,
      ]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <IconSymbol
            name={EXERCISE_ICONS[type]}
            size={24}
            color="#666"
            style={styles.icon}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
        <View
          testID="status-indicator"
          style={[styles.statusIndicator, { backgroundColor: STATUS_COLORS[status] }]}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.stats}>
          <Text style={styles.statLabel}>Duration</Text>
          <Text style={styles.statValue}>{formatDuration(duration)}</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.statLabel}>Calories</Text>
          <Text style={styles.statValue}>{calories}</Text>
        </View>
      </View>

      {typeof progress === 'number' && progress > 0 && (
        <View style={styles.progressContainer}>
          <ProgressBar
            testID="progress-bar"
            value={progress}
            variant="determinate"
            size="small"
          />
        </View>
      )}

      {renderControls()}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  compactContainer: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  stats: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  progressContainer: {
    marginBottom: 12,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  controlButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
}); 