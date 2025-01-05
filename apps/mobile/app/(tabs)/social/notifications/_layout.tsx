import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function NotificationLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '알림',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="[type]/[id]"
        options={{
          title: '',
          headerBackTitle: '알림',
          presentation: 'card',
        }}
      />
    </Stack>
  );
} 