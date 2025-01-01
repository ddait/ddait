import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '../../../hooks/useThemeColor';

interface HeaderRightProps {
  unreadChats?: number;
  unreadNotifications?: number;
}

export function HeaderRight({ unreadChats = 0, unreadNotifications = 0 }: HeaderRightProps) {
  const router = useRouter();
  const iconColor = useThemeColor({}, 'text') as string;

  const handleChatPress = () => {
    router.push('/(tabs)/social/chat');
  };

  const handleNotificationPress = () => {
    router.push('/(tabs)/social/notifications');
  };

  return (
    <View style={styles.container}>
      <Pressable 
        testID="chat-button"
        onPress={handleChatPress} 
        style={styles.iconContainer}
      >
        <Ionicons name="chatbubble-outline" size={24} color={iconColor} />
        {unreadChats > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadChats > 99 ? '99+' : unreadChats}</Text>
          </View>
        )}
      </Pressable>
      <Pressable 
        testID="notification-button"
        onPress={handleNotificationPress} 
        style={styles.iconContainer}
      >
        <Ionicons name="notifications-outline" size={24} color={iconColor} />
        {unreadNotifications > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {unreadNotifications > 99 ? '99+' : unreadNotifications}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
    gap: 16,
  },
  iconContainer: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 