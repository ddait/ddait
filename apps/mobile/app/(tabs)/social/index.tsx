import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useFriends } from '@/hooks/useFriends';
import { FriendList } from '@/components/social/FriendList/FriendList';
import type { Friend } from '@/components/social/FriendCard/types';
import { Stack } from 'expo-router';

export default function SocialScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { friends, isLoading, error, refetch } = useFriends();

  const handleFriendPress = (friend: Friend) => {
    // TODO: Navigate to friend profile or start chat
    console.log('Friend pressed:', friend);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: '친구',
          headerLargeTitle: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
          },
        }}
      />
      
      {error ? (
        <View style={[styles.container, styles.centered]}>
          <Text style={[styles.errorText, { color: colors.text }]}>
            친구 목록을 불러오는데 실패했습니다.
          </Text>
          <TouchableOpacity
            testID="retry-button"
            style={[styles.retryButton, { backgroundColor: colors.primary }]}
            onPress={refetch}
          >
            <Text style={[styles.retryText, { color: colors.background }]}>다시 시도</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FriendList
            friends={friends}
            onFriendPress={handleFriendPress}
            testID="friend-list"
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={refetch}
                colors={[colors.text]}
                tintColor={colors.text}
              />
            }
          />
          {isLoading && friends.length === 0 && (
            <View style={[styles.loadingContainer, styles.centered]}>
              <ActivityIndicator testID="loading-indicator" size="large" color={colors.text} />
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  errorText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryText: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 