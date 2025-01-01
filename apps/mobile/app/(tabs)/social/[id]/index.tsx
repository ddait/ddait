import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@hooks/useColorScheme';
import { Colors } from '@constants/Colors';
import { Profile } from '@components/profile/Profile';
import { useFriend } from '@hooks/useFriend';

export default function FriendProfileScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { friend } = useFriend(id as string);

  if (!friend) {
    return null;
  }

  const userProfile = {
    id: friend.id,
    name: friend.name,
    profileImage: friend.profileImage,
    workoutStats: {
      totalWorkouts: friend.workoutStats.totalWorkouts,
    },
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Profile user={userProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 