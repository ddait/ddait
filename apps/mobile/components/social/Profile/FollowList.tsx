import React from 'react';
import { FlatList, View, Image, RefreshControl, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IEnhancedFollowUser } from '../Follow/types';
import { FollowButton } from './FollowButton';

interface IFollowListProps {
  users: IEnhancedFollowUser[];
  isLoading: boolean;
  isRefreshing: boolean;
  hasMore: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  onFollowPress: (userId: string) => void;
}

export function FollowList({
  users,
  isLoading,
  isRefreshing,
  hasMore,
  onRefresh,
  onLoadMore,
  onFollowPress,
}: IFollowListProps) {
  const renderItem = ({ item: user }: { item: IEnhancedFollowUser }) => (
    <ThemedView className="flex-row items-center p-4 border-b border-gray-200 dark:border-gray-700">
      <Image
        source={{ uri: user.avatar }}
        className="w-12 h-12 rounded-full"
      />
      <View className="flex-1 ml-4">
        <ThemedText className="font-bold">{user.username}</ThemedText>
        {user.bio && (
          <ThemedText className="text-sm text-gray-500" numberOfLines={1}>
            {user.bio}
          </ThemedText>
        )}
        {user.mutualFriends !== undefined && user.mutualFriends > 0 && (
          <ThemedText className="text-xs text-gray-500">
            함께 아는 친구 {user.mutualFriends}명
          </ThemedText>
        )}
      </View>
      <FollowButton
        status={user.followStatus}
        onPress={() => onFollowPress(user.id)}
      />
    </ThemedView>
  );

  const renderEmpty = () => (
    <View className="flex-1 items-center justify-center py-8">
      <ThemedText className="text-gray-500">
        사용자가 없습니다.
      </ThemedText>
    </View>
  );

  const renderFooter = () => {
    if (!hasMore) return null;
    return (
      <View className="py-4">
        <ActivityIndicator />
      </View>
    );
  };

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
      onEndReached={hasMore ? onLoadMore : undefined}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      contentContainerStyle={users.length === 0 ? { flex: 1 } : undefined}
    />
  );
} 