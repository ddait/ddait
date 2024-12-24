import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WorkoutTypeSelector } from '../../components/workout/WorkoutTypeSelector';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function WorkoutScreen() {
  const [selectedWorkoutType, setSelectedWorkoutType] = useState<string | undefined>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleWorkoutTypeSelect = (workoutId: string) => {
    setSelectedWorkoutType(workoutId);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <WorkoutTypeSelector
        selectedType={selectedWorkoutType}
        onSelect={handleWorkoutTypeSelect}
        initialCategory="cardio"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
}); 