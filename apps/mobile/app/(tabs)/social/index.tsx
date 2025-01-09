import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import FeedList from '@/components/social/Feed/FeedList';
import FeedHeader from '@/components/social/Feed/FeedHeader';
import { useFeed } from '@/hooks/useFeed';

export default function SocialScreen() {
  const { 
    posts, 
    isLoading, 
    isRefreshing,
    hasMore,
    filter,
    sort,
    error,
    refresh,
    loadMore,
    updateFilter,
    updateSort,
  } = useFeed();

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FeedHeader
        currentFilter={filter}
        currentSort={sort}
        onFilterChange={updateFilter}
        onSortChange={updateSort}
      />
      <FeedList
        posts={posts}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        hasMore={hasMore}
        error={error}
        onRefresh={refresh}
        onLoadMore={loadMore}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 