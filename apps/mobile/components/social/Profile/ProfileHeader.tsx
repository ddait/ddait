import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IUserProfile } from '../Follow/types';
import { FollowButton } from './FollowButton';

interface IProfileHeaderProps {
  profile: IUserProfile;
  stats: {
    followersCount: number;
    followingCount: number;
    mutualCount?: number;
  };
  isOwnProfile: boolean;
  onFollowPress?: () => void;
  onEditPress?: () => void;
}

export function ProfileHeader({
  profile,
  stats,
  isOwnProfile,
  onFollowPress,
  onEditPress,
}: IProfileHeaderProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleFollowersPress = () => {
    router.push({
      pathname: '/(tabs)/social/profile/[id]/followers' as any,
      params: { id: profile.id }
    });
  };

  const handleFollowingPress = () => {
    router.push({
      pathname: '/(tabs)/social/profile/[id]/following' as any,
      params: { id: profile.id }
    });
  };

  return (
    <ThemedView className="p-4">
      <View className="flex-row items-center">
        <Image
          source={{ uri: profile.avatar }}
          className="w-20 h-20 rounded-full"
        />
        <View className="flex-1 ml-4">
          <View className="flex-row items-center justify-between">
            <View>
              <ThemedText className="text-lg font-bold">
                {profile.username}
              </ThemedText>
              {profile.level && (
                <ThemedText className="text-sm text-gray-500">
                  Level {profile.level}
                </ThemedText>
              )}
            </View>
            {isOwnProfile ? (
              <Pressable
                onPress={onEditPress}
                className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <ThemedText className="text-sm">프로필 편집</ThemedText>
              </Pressable>
            ) : (
              <FollowButton onPress={onFollowPress} />
            )}
          </View>
          
          <View className="flex-row mt-4">
            <Pressable
              onPress={handleFollowersPress}
              className="flex-1 items-center"
            >
              <ThemedText className="text-lg font-bold">
                {stats.followersCount}
              </ThemedText>
              <ThemedText className="text-sm text-gray-500">팔로워</ThemedText>
            </Pressable>
            <Pressable
              onPress={handleFollowingPress}
              className="flex-1 items-center"
            >
              <ThemedText className="text-lg font-bold">
                {stats.followingCount}
              </ThemedText>
              <ThemedText className="text-sm text-gray-500">팔로잉</ThemedText>
            </Pressable>
            <View className="flex-1 items-center">
              <ThemedText className="text-lg font-bold">
                {stats.mutualCount}
              </ThemedText>
              <ThemedText className="text-sm text-gray-500">함께 아는 친구</ThemedText>
            </View>
          </View>
        </View>
      </View>

      {profile.bio && (
        <ThemedText className="mt-4 text-sm">
          {profile.bio}
        </ThemedText>
      )}

      {profile.exercisePreferences && profile.exercisePreferences.length > 0 && (
        <View className="flex-row flex-wrap mt-2">
          {profile.exercisePreferences.map((preference, index) => (
            <View
              key={index}
              className="px-3 py-1 mr-2 mt-2 rounded-full bg-gray-100 dark:bg-gray-800"
            >
              <ThemedText className="text-xs">
                {preference}
              </ThemedText>
            </View>
          ))}
        </View>
      )}
    </ThemedView>
  );
} 