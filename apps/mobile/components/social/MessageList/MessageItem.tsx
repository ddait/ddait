import React from 'react';
import { View, StyleSheet, ColorValue } from 'react-native';
import { Message } from '@/types/chat';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  const backgroundColor = useThemeColor({}, 'cardBackground') as ColorValue;
  const isMine = message.senderId === 'user1'; // TODO: 실제 사용자 ID로 변경

  return (
    <View style={[
      styles.container,
      isMine ? styles.myMessage : styles.otherMessage,
      { backgroundColor }
    ]}>
      <ThemedText>{message.text}</ThemedText>
      <ThemedText style={styles.timestamp}>
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    marginHorizontal: 12,
  },
  myMessage: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
}); 