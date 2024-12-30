import React from 'react';
import { TouchableOpacity, View, Image, ColorValue } from 'react-native';
import { ThemedText } from '../../ThemedText';
import { IChatListItemProps } from './types';
import { styles } from './styles';
import { useThemeColor } from '../../../hooks/useThemeColor';

const ChatListItem: React.FC<IChatListItemProps> = ({ chatRoom, onPress }) => {
  const backgroundColor = useThemeColor({}, 'cardBackground');
  const textColor = useThemeColor({}, 'text');

  const formattedTime = new Date(chatRoom.lastMessageTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity
      testID="chat-list-item"
      onPress={() => onPress?.(chatRoom)}
      style={[styles.chatItem, { backgroundColor: backgroundColor as ColorValue }]}
    >
      <View style={styles.avatarContainer}>
        {chatRoom.avatar ? (
          <Image
            source={{ uri: chatRoom.avatar }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatar} />
        )}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <ThemedText style={styles.name}>{chatRoom.name}</ThemedText>
          <ThemedText style={styles.time}>{formattedTime}</ThemedText>
        </View>
        <ThemedText
          style={[styles.message, { color: textColor as ColorValue }]}
          numberOfLines={1}
        >
          {chatRoom.lastMessage}
        </ThemedText>
      </View>
      {chatRoom.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <ThemedText style={styles.unreadText}>
            {chatRoom.unreadCount}
          </ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ChatListItem; 