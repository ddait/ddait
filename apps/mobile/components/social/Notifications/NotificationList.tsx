import React, { useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { INotification } from './types';
import NotificationItem from './NotificationItem';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';

interface INotificationListProps {
  notifications: INotification[];
  isLoading: boolean;
  isRefreshing: boolean;
  hasMore: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function NotificationList({
  notifications,
  isLoading,
  isRefreshing,
  hasMore,
  onRefresh,
  onLoadMore,
  onMarkAsRead,
  onDelete,
}: INotificationListProps) {
  const renderItem = useCallback(({ item }: { item: INotification }) => (
    <NotificationItem
      notification={item}
      onMarkAsRead={onMarkAsRead}
      onDelete={onDelete}
    />
  ), [onMarkAsRead, onDelete]);

  const keyExtractor = useCallback((item: INotification) => item.id, []);

  const handleEndReached = useCallback(() => {
    if (!isLoading && hasMore) {
      onLoadMore();
    }
  }, [isLoading, hasMore, onLoadMore]);

  if (isLoading && !notifications.length) {
    return <LoadingState />;
  }

  if (!isLoading && !notifications.length) {
    return <EmptyState />;
  }

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E1E1E1',
  },
}); 