import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import { useColorScheme } from '../../../hooks/useColorScheme';
import { Button } from '../../../components/common/Button/Button';

export default function WorkoutSetupScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const handleStartWorkout = () => {
    router.push({
      pathname: '/(tabs)/workout/session',
      params: { type }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: '운동 설정',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          {type} 운동 설정
        </Text>
        {/* TODO: Add workout settings (timer, goals, etc.) */}
        <Button
          variant="primary"
          onPress={handleStartWorkout}
          style={styles.startButton}
        >
          운동 시작
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  startButton: {
    marginTop: 'auto',
  },
}); 