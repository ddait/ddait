import { Stack } from 'expo-router';
import { useColorScheme } from '@hooks/useColorScheme';
import { Colors } from '../../../constants/Colors';

export default function CompetitionLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[theme].background,
        },
        headerTintColor: Colors[theme].text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '경쟁',
        }}
      />
      <Stack.Screen
        name="matching/index"
        options={{
          title: '1:1 대결',
        }}
      />
      <Stack.Screen
        name="matching/waiting"
        options={{
          title: '매칭 중',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="result/index"
        options={{
          title: '결과',
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
} 