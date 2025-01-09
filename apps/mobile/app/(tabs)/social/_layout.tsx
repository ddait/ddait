import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import HeaderRight from '@/components/common/HeaderRight';

export default function SocialLayout() {
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
          title: '소셜',
          headerRight: () => <HeaderRight />,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="profile/[id]"
        options={{
          title: '프로필',
          headerBackTitle: '소셜',
        }}
      />
      <Stack.Screen
        name="post/[id]"
        options={{
          title: '게시물',
          headerBackTitle: '소셜',
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
          title: '',
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
        name="notifications/[type]/[id]"
        options={{
          title: '',
          headerBackTitle: '알림',
        }}
      />
    </Stack>
  );
} 