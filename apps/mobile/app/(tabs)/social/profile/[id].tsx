import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ProfileHeader } from '@/components/social/Profile/ProfileHeader';
import { ProfileStats } from '@/components/social/Profile/ProfileStats';
import { useFollow } from '@/hooks/useFollow';

export default function ProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    followers,
    following,
    stats,
    isLoading,
    isRefreshing,
    error,
    follow,
    unfollow,
    refresh,
  } = useFollow(id);

  const handleFollowPress = async () => {
    try {
      await follow(id);
    } catch (error) {
      console.error('Failed to follow user:', error);
    }
  };

  const handleUnfollowPress = async () => {
    try {
      await unfollow(id);
    } catch (error) {
      console.error('Failed to unfollow user:', error);
    }
  };

  // TODO: 실제 사용자 정보 API 연동
  const mockProfile = {
    id,
    username: '김운동',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: '운동을 사랑하는 사람',
    exercisePreferences: ['헬스', '러닝'],
    level: 3,
  };

  const isOwnProfile = id === 'currentUserId'; // TODO: 실제 현재 사용자 ID와 비교

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={refresh}
        />
      }
    >
      <ThemedView>
        <ProfileHeader
          profile={mockProfile}
          stats={stats}
          isOwnProfile={isOwnProfile}
          onFollowPress={handleFollowPress}
          onEditPress={() => {/* TODO: 프로필 편집 화면으로 이동 */}}
        />
        <ProfileStats
          stats={stats}
          onFollowersPress={() => {/* TODO: 팔로워 목록으로 이동 */}}
          onFollowingPress={() => {/* TODO: 팔로잉 목록으로 이동 */}}
        />
      </ThemedView>
    </ScrollView>
  );
} 