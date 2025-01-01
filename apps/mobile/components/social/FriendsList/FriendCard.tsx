import React from 'react';
import { TouchableOpacity, View, Image, ColorValue } from 'react-native';
import { ThemedText } from '../../ThemedText';
import { IFriendCardProps } from './types';
import { styles } from './styles';
import { useThemeColor } from '../../../hooks/useThemeColor';

const FriendCard: React.FC<IFriendCardProps> = ({ friend, onPress }) => {
  console.log('FriendCard rendering:', friend);
  
  const backgroundColor = useThemeColor({}, 'cardBackground') as ColorValue;
  const textColor = useThemeColor({}, 'text') as ColorValue;

  const formattedTime = new Date(friend.lastActive).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity
      testID="friend-card"
      onPress={() => onPress?.(friend)}
      style={styles.friendCard}
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
          <ThemedText style={styles.activity} numberOfLines={1}>
            {friend.recentActivity}
          </ThemedText>
        )}
        <ThemedText style={styles.activity}>
          {friend.isOnline ? '온라인' : `마지막 접속 ${formattedTime}`}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

export default FriendCard; 