import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import { useColorScheme } from '../../../hooks/useColorScheme';
import { WorkoutTypeSelector } from '../../../components/workout/WorkoutTypeSelector';

export default function WorkoutScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const handleWorkoutSelect = (workoutId: string) => {
    router.push({
      pathname: '/workout/setup',
      params: { type: workoutId }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <WorkoutTypeSelector onSelect={handleWorkoutSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 