import { Stack } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
