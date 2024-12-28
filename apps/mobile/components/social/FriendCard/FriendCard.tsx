import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useColorScheme } from '@hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import type { FriendCardProps } from './types';

const STATUS_COLORS = {
  online: '#4CAF50',
  exercising: '#FF5722',
  offline: '#9E9E9E',
};

export function FriendCard({ friend, onPress, testID }: FriendCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity
      testID={testID}
      style={[styles.container, { backgroundColor: colors.background }]}
      onPress={() => onPress(friend)}
    >
      <View style={styles.profileContainer}>
        <Image source={{ uri: friend.profileImage }} style={styles.profileImage} />
        <View
          testID="status-indicator"
          style={[styles.statusDot, { backgroundColor: STATUS_COLORS[friend.status] }]}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: colors.text }]}>{friend.name}</Text>
        <Text style={[styles.status, { color: colors.text }]}>
          {friend.status === 'online'
            ? '온라인'
            : friend.status === 'exercising'
            ? '운동 중'
            : '오프라인'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  infoContainer: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    opacity: 0.7,
  },
}); 