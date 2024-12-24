import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ExerciseCard } from '../../components/exercise/ExerciseCard';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import type {
  ActiveExerciseCardProps,
  PausedExerciseCardProps,
  CompletedExerciseCardProps,
} from '../../components/exercise/ExerciseCard/types';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handlePause = () => console.log('Pause');
  const handleResume = () => console.log('Resume');
  const handleStop = () => console.log('Stop');

  const activeExercise: ActiveExerciseCardProps = {
    title: "Morning Run",
    type: "running",
    duration: 1800,
    calories: 250,
    status: "active",
    progress: 75,
    onPause: handlePause,
    onStop: handleStop,
  };

  const pausedExercise: PausedExerciseCardProps = {
    title: "Evening Cycling",
    type: "cycling",
    duration: 3600,
    calories: 450,
    status: "paused",
    progress: 50,
    onResume: handleResume,
    onStop: handleStop,
  };

  const completedExercise: CompletedExerciseCardProps = {
    title: "Swimming",
    type: "swimming",
    duration: 2700,
    calories: 350,
    status: "completed",
    progress: 100,
    variant: "compact",
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <ExerciseCard name={''} sets={[]} {...activeExercise} />
        <View style={styles.spacer} />
        <ExerciseCard name={''} sets={[]} {...pausedExercise} />
        <View style={styles.spacer} />
        <ExerciseCard name={''} sets={[]} {...completedExercise} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  spacer: {
    height: 16,
  },
});
