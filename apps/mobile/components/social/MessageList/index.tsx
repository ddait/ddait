import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Message } from '@/types/chat';
import { MessageItem } from './MessageItem';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  onLoadMore?: () => void;
}

export function MessageList({ messages, isLoading, onLoadMore }: MessageListProps) {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <MessageItem message={item} />}
      keyExtractor={(item) => item.id}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      inverted
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
}); 