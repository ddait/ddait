import { Stack } from 'expo-router';
import { useColorScheme } from '@hooks/useColorScheme';
import { Colors } from '../../../constants/Colors';
import { HeaderRight } from '../../../components/common/HeaderRight';

export default function SocialLayout() {
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
          title: '소셜',
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="chat/index"
        options={{
          title: '채팅',
          headerBackTitle: '소셜',
        }}
      />
      <Stack.Screen
        name="chat/[id]"
        options={{
          title: '채팅',
          headerBackTitle: '채팅',
        }}
      />
      <Stack.Screen
        name="notifications/index"
        options={{
          title: '알림',
          headerBackTitle: '소셜',
        }}
      />
      <Stack.Screen
        name="[id]/index"
        options={{
          title: '프로필',
          headerBackTitle: '소셜',
        }}
      />
    </Stack>
  );
} 