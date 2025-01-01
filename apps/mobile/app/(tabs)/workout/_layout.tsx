import { Stack } from 'expo-router';
import { useColorScheme } from '@hooks/useColorScheme';
import { Colors } from '../../../constants/Colors';

export default function WorkoutLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '운동 선택',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="setup"
        options={{
          title: '운동 설정',
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="session"
        options={{
          title: '운동 중',
          presentation: 'card',
          gestureEnabled: false,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="complete"
        options={{
          title: '운동 완료',
          presentation: 'card',
          gestureEnabled: false,
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
} 