import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import { useColorScheme } from '../../../hooks/useColorScheme';
import { ExerciseTimer } from '../../../components/exercise/ExerciseTimer/ExerciseTimer';
import { TimeFormat } from '../../../components/exercise/ExerciseTimer/types';
import { Button } from '../../../components/common/Button/Button';

export default function WorkoutSessionScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const [duration, setDuration] = useState(0);

  const handleTimeUpdate = (time: number) => {
    setDuration(Math.floor(time / 60)); // Convert seconds to minutes
  };

  const handleComplete = () => {
    router.push({
      pathname: '/(tabs)/workout/complete',
      params: { type, duration: duration.toString() }
    });
  };

  const timerFormat: TimeFormat = 'mm:ss';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: '운동 중',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      />
      <View style={styles.content}>
        <ExerciseTimer
          onTimeUpdate={handleTimeUpdate}
          format={timerFormat}
          showControls={true}
          hapticFeedback={true}
          style={styles.timer}
          initialTime={0}
        />
        <Button
          variant="primary"
          onPress={handleComplete}
          style={styles.completeButton}
        >
          운동 종료
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  completeButton: {
    marginTop: 20,
  },
  timer: {
    // Add any additional styles for the timer component
  },
}); 