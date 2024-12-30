import React from 'react';
import { TouchableOpacity, View, Image, ColorValue } from 'react-native';
import { ThemedText } from '../../ThemedText';
import { IFriendCardProps } from './types';
import { styles } from './styles';
import { useThemeColor } from '../../../hooks/useThemeColor';

const FriendCard: React.FC<IFriendCardProps> = ({ friend, onPress }) => {
  const backgroundColor = useThemeColor({}, 'cardBackground');
  const textColor = useThemeColor({}, 'text');

  const formattedTime = new Date(friend.lastActive).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity
      testID="friend-card"
      onPress={() => onPress?.(friend)}
      style={[styles.friendCard, { backgroundColor: backgroundColor as ColorValue }]}
    >
      <View style={styles.avatarContainer}>
        {friend.avatar ? (
          <Image
            source={{ uri: friend.avatar }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatar} />
        )}
        {friend.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.nameContainer}>
          <ThemedText style={styles.name}>{friend.name}</ThemedText>
        </View>
        {friend.recentActivity && (
          <ThemedText
            style={[styles.activity, { color: textColor as ColorValue }]}
            numberOfLines={1}
          >
            {friend.recentActivity}
          </ThemedText>
        )}
        <ThemedText style={styles.activity}>
          {friend.isOnline ? 'Online' : `Last active ${formattedTime}`}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

export default FriendCard; 