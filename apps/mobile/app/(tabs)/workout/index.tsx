import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import { useColorScheme } from '@hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExerciseTypeGrid } from '@/components/exercise/ExerciseTypeGrid';
import { RecentExercises } from '@/components/exercise/RecentExercises';
import { ExercisePresets } from '@/components/exercise/ExercisePresets';
import { CustomExerciseForm } from '@/components/exercise/CustomExerciseForm';

export default function WorkoutScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <ExerciseTypeGrid />
        <RecentExercises />
        <ExercisePresets />
        <CustomExerciseForm />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
}); 