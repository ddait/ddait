import { Stack } from 'expo-router';
import { useColorScheme } from '@hooks/useColorScheme';
import { Colors } from '../constants/Colors';

// Define available routes
const ALLOWED_ROUTES = [
  '/',
  '/workout',
  '/competition',
  '/social',
  '/workout/setup',
  '/workout/session',
  '/workout/complete',
  '/profile',
];

export default function RootLayout() {
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
      initialRouteName="(tabs)"
    >
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
