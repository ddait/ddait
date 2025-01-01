import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IActivityStatsProps } from '../../types';
import { styles } from '../../styles';

const ActivityStats: React.FC<IActivityStatsProps> = ({ stats }) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  const formatDistance = (meters: number) => {
    const kilometers = (meters / 1000).toFixed(1);
    return `${kilometers}km`;
  };

  return (
    <View style={styles.statsContainer}>
      <ThemedText style={styles.sectionTitle}>활동 통계</ThemedText>
      
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <ThemedText style={styles.statValue}>{stats.totalWorkouts}</ThemedText>
          <ThemedText style={styles.statLabel}>총 운동 횟수</ThemedText>
        </View>
        
        <View style={styles.statItem}>
          <ThemedText style={styles.statValue}>
            {formatTime(stats.totalTime)}
          </ThemedText>
          <ThemedText style={styles.statLabel}>총 운동 시간</ThemedText>
        </View>
        
        <View style={styles.statItem}>
          <ThemedText style={styles.statValue}>
            {formatDistance(stats.totalDistance)}
          </ThemedText>
          <ThemedText style={styles.statLabel}>총 운동 거리</ThemedText>
        </View>
        
        <View style={styles.statItem}>
          <ThemedText style={styles.statValue}>
            {Math.round((stats.weeklyProgress.workouts / stats.weeklyProgress.target) * 100)}%
          </ThemedText>
          <ThemedText style={styles.statLabel}>주간 목표 달성률</ThemedText>
        </View>
      </View>
    </View>
  );
};

export default ActivityStats; 