import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { WorkoutTypeSelector } from '../../components/workout/WorkoutTypeSelector';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '@hooks/useColorScheme';

export default function WorkoutScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const handleWorkoutTypeSelect = (workoutId: string) => {
    router.push({
      pathname: '/UItest/workout/setup',
      params: { type: workoutId }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: '운동 선택',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      />
      <WorkoutTypeSelector
        selectedType={undefined}
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