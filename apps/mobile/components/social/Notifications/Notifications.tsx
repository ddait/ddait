import React from 'react';
import { FlatList, TouchableOpacity, ActivityIndicator, ColorValue } from 'react-native';
import { ThemedView } from '../../ThemedView';
import { ThemedText } from '../../ThemedText';
import { INotification, INotificationsProps } from './types';
import { styles } from './styles';
import { useThemeColor } from '../../../hooks/useThemeColor';

const NotificationItem: React.FC<{
  notification: INotification;
  onPress?: (notification: INotification) => void;
}> = ({ notification, onPress }) => {
  const backgroundColor = useThemeColor({}, 'cardBackground');

  return (
    <TouchableOpacity
      testID="notification-item"
      onPress={() => onPress?.(notification)}
      style={[styles.notificationItem, { backgroundColor: backgroundColor as ColorValue }]}
    >
      <ThemedText style={styles.notificationMessage}>
        {notification.message}
      </ThemedText>
      <ThemedText style={styles.timestamp}>
        {new Date(notification.timestamp).toLocaleDateString()}
      </ThemedText>
    </TouchableOpacity>
  );
};

const Notifications: React.FC<INotificationsProps> = ({
  notifications = [],
  isLoading = false,
  onNotificationPress,
}) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  if (isLoading && !notifications.length) {
    return (
      <ThemedView style={styles.loadingContainer} testID="notifications-loading">
        <ActivityIndicator size="large" color={textColor as ColorValue} />
      </ThemedView>
    );
  }

  if (!notifications.length) {
    return (
      <ThemedView style={styles.emptyContainer} testID="notifications-empty">
        <ThemedText style={styles.emptyText}>No notifications</ThemedText>
      </ThemedView>
    );
  }

  return (
    <FlatList
      data={notifications}
      renderItem={({ item }) => (
        <NotificationItem
          notification={item}
          onPress={onNotificationPress}
        />
      )}
      keyExtractor={(item) => item.id}
      style={[styles.container, { backgroundColor: backgroundColor as ColorValue }]}
    />
  );
};

export default Notifications; 