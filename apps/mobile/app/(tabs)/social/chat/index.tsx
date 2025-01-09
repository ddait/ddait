import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import ChatList from '@/components/social/ChatList';
import { useChats } from '@/hooks/useChats';
import { ChatRoom } from '@/types/chat';

function ErrorView({ message, onRetry }: { message: string; onRetry: () => void }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, styles.centered]}>
      <Text style={[styles.errorText, { color: colors.text }]}>{message}</Text>
      <TouchableOpacity
        style={[styles.retryButton, { backgroundColor: colors.primary }]}
        onPress={onRetry}
      >
        <Text style={[styles.retryText, { color: colors.background }]}>다시 시도</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ChatListScreen() {
  const { chats, isLoading, error, refetch, loadMore } = useChats();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const handleChatRoomPress = (chatRoom: ChatRoom ) => {
    router.push({
      pathname: '/(tabs)/social/chat/[id]',
      params: { id: chatRoom.id }
    });
  };

  if (error) {
    return <ErrorView message="채팅 목록을 불러오는데 실패했습니다." onRetry={refetch} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ChatList
        chatRooms={chats}
        isLoading={isLoading}
        onRefresh={refetch}
        onLoadMore={loadMore}
        onChatRoomPress={handleChatRoomPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryText: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 