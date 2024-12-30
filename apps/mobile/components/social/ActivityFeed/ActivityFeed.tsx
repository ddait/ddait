import React from 'react';
import { FlatList, RefreshControl, ActivityIndicator, ColorValue } from 'react-native';
import { ThemedView } from '../../ThemedView';
import { ThemedText } from '../../ThemedText';
import { IActivity, IActivityFeedProps } from './types';
import { styles } from './styles';
import { useThemeColor } from '../../../hooks/useThemeColor';

const ActivityFeed: React.FC<IActivityFeedProps> = ({
  activities = [],
  isLoading = false,
  onRefresh,
  onLoadMore,
}) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const renderItem = ({ item }: { item: IActivity }) => (
    <ThemedView style={styles.activityItem} testID="activity-item">
      <ThemedText style={styles.activityContent}>{item.content}</ThemedText>
      <ThemedText style={styles.timestamp}>
        {new Date(item.timestamp).toLocaleDateString()}
      </ThemedText>
    </ThemedView>
  );

  if (isLoading && !activities.length) {
    return (
      <ThemedView style={styles.loadingContainer} testID="activity-feed-loading">
        <ActivityIndicator size="large" color={textColor as ColorValue} />
      </ThemedView>
    );
  }

  if (!activities.length) {
    return (
      <ThemedView style={styles.emptyContainer} testID="activity-feed-empty">
        <ThemedText style={styles.emptyText}>No activities yet</ThemedText>
      </ThemedView>
    );
  }

  return (
    <FlatList
      testID="activity-feed-list"
      data={activities}
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

export default ActivityFeed; 