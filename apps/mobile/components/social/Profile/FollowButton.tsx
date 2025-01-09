import React from 'react';
import { Pressable, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { FollowStatus } from '../Follow/types';

interface IFollowButtonProps {
  status?: FollowStatus;
  isLoading?: boolean;
  onPress?: () => void;
}

export function FollowButton({
  status = 'none',
  isLoading = false,
  onPress,
}: IFollowButtonProps) {
  const getButtonStyle = () => {
    switch (status) {
      case 'following':
      case 'mutual':
        return 'bg-gray-200 dark:bg-gray-700';
      case 'followed':
        return 'bg-blue-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getButtonText = () => {
    switch (status) {
      case 'following':
        return '팔로잉';
      case 'mutual':
        return '맞팔로우';
      case 'followed':
        return '맞팔로우 하기';
      default:
        return '팔로우';
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      className={`px-4 py-2 rounded-full ${getButtonStyle()}`}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <ThemedText className="text-sm">
          {getButtonText()}
        </ThemedText>
      )}
    </Pressable>
  );
} 