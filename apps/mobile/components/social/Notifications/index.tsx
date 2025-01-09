import React from 'react';
import { View, StyleSheet } from 'react-native';
import { INotification } from './types';
import NotificationList from './NotificationList';

interface INotificationsProps {
  notifications: INotification[];
  isLoading: boolean;
  isRefreshing: boolean;
  hasMore: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function Notifications({
  notifications,
  isLoading,
  isRefreshing,
  hasMore,
  onRefresh,
  onLoadMore,
  onMarkAsRead,
  onDelete,
}: INotificationsProps) {
  return (
    <View style={styles.container}>
      <NotificationList
        notifications={notifications}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        hasMore={hasMore}
        onRefresh={onRefresh}
        onLoadMore={onLoadMore}
        onMarkAsRead={onMarkAsRead}
        onDelete={onDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 