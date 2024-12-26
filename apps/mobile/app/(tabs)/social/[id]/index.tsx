import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useFriend } from '@/hooks/useFriend';

export default function FriendProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { friend, isLoading, error, removeFriend } = useFriend(id);

  const handleRemoveFriend = async () => {
    Alert.alert(
      '친구 삭제',
      '정말로 이 친구를 삭제하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            await removeFriend(id);
            router.back();
          },
        },
      ],
    );
  };

  const handleChatPress = () => {
    // TODO: Navigate to chat screen
    console.log('Chat pressed with friend:', friend?.name);
  };

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={[styles.errorText, { color: colors.text }]}>
          친구 정보를 불러오는데 실패했습니다.
        </Text>
      </View>
    );
  }

  if (isLoading || !friend) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator testID="loading-indicator" size="large" color={colors.text} />
      </View>
    );
  }

  const hours = Math.floor(friend.workoutStats.totalMinutes / 60);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: friend.name,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      />

      <View style={styles.profileSection}>
        <Image
          testID="profile-image"
          source={{ uri: friend.profileImage }}
          style={styles.profileImage}
        />
        <Text style={[styles.name, { color: colors.text }]}>{friend.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: friend.status === 'online' ? '#4CAF50' : '#9E9E9E' }]}>
          <Text style={styles.statusText}>
            {friend.status === 'online' ? '온라인' : '오프라인'}
          </Text>
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={[styles.statsTitle, { color: colors.text }]}>운동 통계</Text>
        <View style={styles.statsGrid}>
          <Text style={[styles.statsText, { color: colors.text }]}>
            총 운동 횟수: {friend.workoutStats.totalWorkouts}회
          </Text>
          <Text style={[styles.statsText, { color: colors.text }]}>
            총 운동 시간: {hours}시간
          </Text>
          <Text style={[styles.statsText, { color: colors.text }]}>
            가장 좋아하는 운동: {friend.workoutStats.favoriteExercise}
          </Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleChatPress}
        >
          <Text style={styles.buttonText}>1:1 대화</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.removeButton]}
          onPress={handleRemoveFriend}
        >
          <Text style={styles.removeButtonText}>친구 삭제</Text>
        </TouchableOpacity>
      </View>
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
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statsSection: {
    padding: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    gap: 12,
  },
  statsText: {
    fontSize: 16,
  },
  actionButtons: {
    padding: 20,
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  removeButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#DC3545',
  },
  removeButtonText: {
    color: '#DC3545',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
}); 