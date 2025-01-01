import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '@constants/Colors';
import { useColorScheme } from '@hooks/useColorScheme';
import { Card } from '@components/common/Card';
import { isLoading } from 'expo-font';
import { Button } from '../common/Button/Button';

interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  workoutCount: number;
  competitionCount: number;  
  winCount: number;         
  workoutStats: {
    totalWorkouts: number;
  };
}

interface ProfileProps {
  user?: User;
  onEdit?: () => void;
  isLoading?: boolean,
  error?: string,
  onRetry?: () => void
}

export function Profile({ user, onEdit, isLoading, error, onRetry }: ProfileProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  if(isLoading) {
    return (
      <View style={styles.container} testID='loading-indicator'>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  if(!user) {
    return (
      <View style={styles.container}>
      <Text style={[styles.message, { color: colors.text }]}>
        프로필 정보를 불러올 수 없습니다.
      </Text>
      {onRetry && (  // onRetry가 있을 때만 버튼 표시
        <Button 
          title="다시 시도" 
          onPress={onRetry} 
        />
      )}
    </View>
    )
  }

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{uri: user.profileImage}}
          style={styles.profileImage}
          testID='profile-image'
        />
        <Text style={[styles.name, { color: colors.text }]}>
          {user.name}
        </Text>
        <Text style={[styles.email, {color: colors.text}]}>
          {user.email}
        </Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.text }]}>운동</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {user.workoutStats.totalWorkouts}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.text }]}>경쟁</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>{user.competitionCount}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.text }]}>승리</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>{user.winCount}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666'
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '500',
  },
}); 