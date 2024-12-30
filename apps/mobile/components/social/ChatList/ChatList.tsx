import React from 'react';
import { FlatList, RefreshControl, ActivityIndicator, ColorValue } from 'react-native';
import { ThemedView } from '../../ThemedView';
import { ThemedText } from '../../ThemedText';
import { IChatListProps, IChatRoom } from './types';
import { styles } from './styles';
import { useThemeColor } from '../../../hooks/useThemeColor';
import ChatListItem from './ChatListItem';

const ChatList: React.FC<IChatListProps> = ({
  chatRooms = [],
  isLoading = false,
  onChatRoomPress,
  onRefresh,
  onLoadMore,
}) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const renderItem = ({ item }: { item: IChatRoom }) => (
    <ChatListItem chatRoom={item} onPress={onChatRoomPress} />
  );

  if (isLoading && !chatRooms.length) {
    return (
      <ThemedView style={styles.loadingContainer} testID="chat-list-loading">
        <ActivityIndicator size="large" color={textColor as ColorValue} />
      </ThemedView>
    );
  }

  if (!chatRooms.length) {
    return (
      <ThemedView style={styles.emptyContainer} testID="chat-list-empty">
        <ThemedText style={styles.emptyText}>No chats yet</ThemedText>
      </ThemedView>
    );
  }

  return (
    <FlatList
      testID="chat-list"
      data={chatRooms}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRefresh}
          tintColor={textColor as ColorValue}
        />
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      style={[styles.container, { backgroundColor: backgroundColor as ColorValue }]}
    />
  );
};

export default ChatList; 