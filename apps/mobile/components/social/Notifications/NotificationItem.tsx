import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { INotification } from './types';
import { formatRelativeTime } from '@/utils/date';

interface INotificationItemProps {
  notification: INotification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
}: INotificationItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handlePress = useCallback(() => {
    if (notification.status === 'unread') {
      onMarkAsRead(notification.id);
    }
    // TODO: 알림 타입별 네비게이션 처리
  }, [notification, onMarkAsRead]);

  const renderRightActions = useCallback(() => (
    <Pressable
      style={[styles.deleteAction, { backgroundColor: colors.error }]}
      onPress={() => onDelete(notification.id)}
    >
      <Text style={styles.actionText}>삭제</Text>
    </Pressable>
  ), [colors.error, notification.id, onDelete]);

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Pressable
        style={[
          styles.container,
          notification.status === 'unread' && styles.unread,
          { backgroundColor: colors.background }
        ]}
        onPress={handlePress}
      >
        <View style={styles.content}>
          <Text
            style={[
              styles.message,
              { color: colors.text },
              notification.status === 'unread' && styles.unreadText
            ]}
            numberOfLines={2}
          >
            {notification.message}
          </Text>
          <Text style={[styles.timestamp, { color: colors.text, opacity: 0.6 }]}>
            {formatRelativeTime(notification.timestamp)}
          </Text>
        </View>
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  unread: {
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    marginBottom: 4,
  },
  unreadText: {
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
  },
  deleteAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
}); 