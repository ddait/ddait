import { Tabs } from 'expo-router';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Colors } from '../../constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[theme].background,
        },
        headerTintColor: Colors[theme].text,
        tabBarActiveTintColor: Colors[theme].primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarLabel: '홈',
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: '운동',
          tabBarLabel: '운동',
        }}
      />
      <Tabs.Screen
        name="competition"
        options={{
          title: '경쟁',
          tabBarLabel: '경쟁',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="social"
        options={{
          title: '소셜',
          tabBarLabel: '소셜',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '프로필',
          tabBarLabel: '프로필',
        }}
      />
    </Tabs>
  );
}
