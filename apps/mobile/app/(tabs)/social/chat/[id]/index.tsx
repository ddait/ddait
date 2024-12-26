import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ChatRoom } from '@/components/social/ChatRoom/ChatRoom';
import { useFriend } from '@/hooks/useFriend';

export default function ChatRoomScreen() {
  const { id } = useLocalSearchParams();
  const { friend } = useFriend(id as string);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: friend?.name ?? '채팅',
          headerBackTitle: '뒤로',
        }}
      />
      <ChatRoom friendId={id as string} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 