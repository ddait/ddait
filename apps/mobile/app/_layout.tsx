import { Stack } from 'expo-router';
import { useColorScheme } from '@hooks/useColorScheme';
import { useFonts } from 'expo-font';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
  const [loaded, error] = useFonts(MaterialIcons.font);

  if (!loaded) {
    console.log('Font loading failed:', error);
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
        },
        headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
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
