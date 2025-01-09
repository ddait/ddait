import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { IFeedItemProps } from './types';
import { formatRelativeTime } from '@/utils/date';

export default function FeedItem({
  post,
  onLike,
  onComment,
  onShare,
  onUserPress,
}: IFeedItemProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleUserPress = useCallback(() => {
    if (onUserPress) {
      onUserPress(post.user.id);
    } else {
      // @ts-ignore
      router.push('/(tabs)/social/profile/' + post.user.id as any);
    }
  }, [post.user.id, onUserPress, router]);

  const handlePostPress = useCallback(() => {
    // @ts-ignore
    router.push('/(tabs)/social/post/' + post.id as any);
  }, [post.id, router]);

  const handleLikePress = useCallback(() => {
    onLike?.(post.id);
  }, [post.id, onLike]);

  const handleCommentPress = useCallback(() => {
    onComment?.(post.id);
  }, [post.id, onComment]);

  const handleSharePress = useCallback(() => {
    onShare?.(post.id);
  }, [post.id, onShare]);

  return (
    <Pressable style={styles.container} onPress={handlePostPress}>
      <View style={styles.header}>
        <Pressable style={styles.userInfo} onPress={handleUserPress}>
          {post.user.avatar ? (
            <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={[styles.avatarText, { color: colors.background }]}>
                {post.user.username[0].toUpperCase()}
              </Text>
            </View>
          )}
          <View>
            <Text style={[styles.username, { color: colors.text }]}>
              {post.user.username}
            </Text>
            <Text style={[styles.timestamp, { color: colors.text, opacity: 0.6 }]}>
              {formatRelativeTime(post.createdAt)}
            </Text>
          </View>
        </Pressable>
      </View>

      <Text style={[styles.content, { color: colors.text }]} numberOfLines={5}>
        {post.content}
      </Text>

      {post.images && post.images.length > 0 && (
        <Image source={{ uri: post.images[0] }} style={styles.image} />
      )}

      <View style={styles.footer}>
        <Pressable style={styles.actionButton} onPress={handleLikePress}>
          <Ionicons
            name={post.isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={post.isLiked ? colors.primary : colors.text}
          />
          <Text style={[styles.actionText, { color: colors.text }]}>
            {post.likes}
          </Text>
        </Pressable>

        <Pressable style={styles.actionButton} onPress={handleCommentPress}>
          <Ionicons name="chatbubble-outline" size={24} color={colors.text} />
          <Text style={[styles.actionText, { color: colors.text }]}>
            {post.comments}
          </Text>
        </Pressable>

        <Pressable style={styles.actionButton} onPress={handleSharePress}>
          <Ionicons name="share-outline" size={24} color={colors.text} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 