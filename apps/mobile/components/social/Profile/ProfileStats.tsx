import React from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IFollowStats } from '../Follow/types';

interface IProfileStatsProps {
  stats: IFollowStats;
  onFollowersPress?: () => void;
  onFollowingPress?: () => void;
}

export function ProfileStats({
  stats,
  onFollowersPress,
  onFollowingPress,
}: IProfileStatsProps) {
  return (
    <View className="flex-row py-4 border-t border-b border-gray-200 dark:border-gray-700">
      <Pressable
        onPress={onFollowersPress}
        className="flex-1 items-center"
      >
        <ThemedText className="text-lg font-bold">
          {stats.followersCount}
        </ThemedText>
        <ThemedText className="text-sm text-gray-500">
          팔로워
        </ThemedText>
      </Pressable>

      <Pressable
        onPress={onFollowingPress}
        className="flex-1 items-center"
      >
        <ThemedText className="text-lg font-bold">
          {stats.followingCount}
        </ThemedText>
        <ThemedText className="text-sm text-gray-500">
          팔로잉
        </ThemedText>
      </Pressable>

      {stats.mutualCount !== undefined && (
        <View className="flex-1 items-center">
          <ThemedText className="text-lg font-bold">
            {stats.mutualCount}
          </ThemedText>
          <ThemedText className="text-sm text-gray-500">
            함께 아는 친구
          </ThemedText>
        </View>
      )}
    </View>
  );
} 