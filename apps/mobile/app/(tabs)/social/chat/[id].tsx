import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useChat } from '@/hooks/useChat';
import { MessageList } from '@/components/social/MessageList';
import { MessageInput } from '@/components/social/MessageInput';

export default function ChatRoomScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { messages, isLoading, sendMessage, loadMore } = useChat(id as string);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <MessageList
        messages={messages}
        isLoading={isLoading}
        onLoadMore={loadMore}
      />
      <MessageInput onSend={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 