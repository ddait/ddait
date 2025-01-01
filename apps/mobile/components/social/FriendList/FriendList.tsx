import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useColorScheme } from '@hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { FriendCard } from '../FriendCard/FriendCard';
import type { FriendListProps } from './types';
import type { Friend, FriendStatus } from '../FriendCard/types';

const STATUS_PRIORITY: Record<FriendStatus, number> = {
  online: 0,
  exercising: 1,
  offline: 2,
};

export function FriendList({ friends, onFriendPress, testID, refreshControl }: FriendListProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const sortedFriends = useMemo(() => {
    return [...friends].sort((a, b) => {
      return STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
    });
  }, [friends]);

  if (friends.length === 0) {
    return (
      <ScrollView
        testID={testID}
        style={styles.container}
        contentContainerStyle={[styles.contentContainer, styles.emptyContainer]}
        refreshControl={refreshControl}
      >
        <Text style={[styles.emptyText, { color: colors.text }]}>
          아직 친구가 없습니다.
        </Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      testID={testID}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={refreshControl}
    >
      {sortedFriends.map((friend) => (
        <FriendCard
          key={friend.id}
          friend={friend}
          onPress={onFriendPress}
          testID={`friend-card-${friend.id}`}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.7,
  },
}); 