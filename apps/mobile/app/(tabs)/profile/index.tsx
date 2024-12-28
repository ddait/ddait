import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Profile } from '@components/profile/Profile';
import { useRouter } from 'expo-router';


// TODO: API 연동 후 실제 사용자 데이터로 교체
const mockUser = {
  id: '1',
  name: '홍길동',
  email: 'hong@example.com',
  profileImage: 'https://via.placeholder.com/150',
  workoutCount: 42,
  competitionCount: 15,
  winCount: 8,
  workoutStats: {
    totalWorkouts: 100,
    totalDuration: 5000
  }
};

export default function ProfileScreen() {
  const router = useRouter();

  const handleEditProfile = () => {
    // TODO: 프로필 수정 화면으로 이동
    router.push('/(tabs)/profile/edit' as any);
  };

  return (
    <Profile
      user={mockUser}
      onEdit={handleEditProfile}
    />
  );
} 