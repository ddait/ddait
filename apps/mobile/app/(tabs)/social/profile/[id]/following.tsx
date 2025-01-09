import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { FollowList } from '@/components/social/Profile/FollowList';
import { useFollow } from '@/hooks/useFollow';

export default function FollowingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    following,
    isLoading,
    isRefreshing,
    hasMore,
    follow,
    unfollow,
    refresh,
    loadMore,
  } = useFollow(id);

  const handleFollowPress = async (userId: string) => {
    try {
      await follow(userId);
    } catch (error) {
      console.error('Failed to follow user:', error);
    }
  };

  return (
    <ThemedView className="flex-1">
      <FollowList
        users={following}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        hasMore={hasMore}
        onRefresh={refresh}
        onLoadMore={loadMore}
        onFollowPress={handleFollowPress}
      />
    </ThemedView>
  );
} 