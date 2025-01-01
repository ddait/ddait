import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@hooks/useColorScheme';
import { Colors } from '@constants/Colors';
import { ChatRoom } from '@components/social/ChatRoom/ChatRoom';
import { useFriend } from '@hooks/useFriend';

export default function ChatRoomScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { friend } = useFriend(id as string);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: friend?.name ?? '채팅',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      />
      <ChatRoom friendId={id as string} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 