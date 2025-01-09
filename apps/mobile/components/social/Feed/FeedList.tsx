import React, { useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { IFeedListProps, IPost } from './types';
import FeedItem from './FeedItem';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

export default function FeedList({
  posts,
  isLoading,
  isRefreshing,
  hasMore,
  error,
  onRefresh,
  onLoadMore,
}: IFeedListProps) {
  const renderItem = useCallback(({ item }: { item: IPost }) => (
    <FeedItem post={item} />
  ), []);

  const keyExtractor = useCallback((item: IPost) => item.id, []);

  const handleEndReached = useCallback(() => {
    if (!isLoading && hasMore) {
      onLoadMore();
    }
  }, [isLoading, hasMore, onLoadMore]);

  if (error) {
    return <ErrorState message="피드를 불러오는데 실패했습니다." onRetry={onRefresh} />;
  }

  if (isLoading && !posts.length) {
    return <LoadingState />;
  }

  if (!isLoading && !posts.length) {
    return <EmptyState />;
  }

  return (
    <FlatList
      data={posts}
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