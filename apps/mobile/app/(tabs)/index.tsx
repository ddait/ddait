import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColorScheme, useColorSchemeActions } from '@hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';
import { Card } from '../../components/common/Card';
import { ProgressBar } from '../../components/common/ProgressBar';
import { WeeklyProgress } from '../../components/home/WeeklyProgress';
import { useHomeData } from '../../hooks/home/useHomeData';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { toggleColorScheme } = useColorSchemeActions();
  const colors = Colors[colorScheme ?? 'light'];
  const { data, isLoading, error, refetch } = useHomeData();

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>데이터를 불러오는데 실패했습니다.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
          <Text style={[styles.retryText, { color: colors.primary }]}>다시 시도</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Text style={[styles.avatarText, { color: colors.white }]}>김</Text>
          </View>
          <View style={styles.profileText}>
            <Text style={[styles.profileName, { color: colors.text }]}>김운동</Text>
            <View style={styles.levelContainer}>
              <Text style={[styles.levelText, { color: colors.text }]}>Lv. 23</Text>
              <ProgressBar progress={75} style={styles.levelProgress} />
            </View>
          </View>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.iconButton} onPress={toggleColorScheme}>
            <FontAwesome name={colorScheme === 'dark' ? 'sun-o' : 'moon-o'} size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="bell" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Today's Summary */}
      <Card style={styles.summaryCard}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>오늘의 운동</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: colors.gray[600] }]}>소모 칼로리</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>{data?.summary.calories ?? 0}</Text>
            <Text style={[styles.statUnit, { color: colors.gray[600] }]}>kcal</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: colors.gray[600] }]}>운동 시간</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>{data?.summary.duration ?? 0}</Text>
            <Text style={[styles.statUnit, { color: colors.gray[600] }]}>분</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: colors.gray[600] }]}>목표 달성</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>{data?.summary.progress ?? 0}</Text>
            <Text style={[styles.statUnit, { color: colors.gray[600] }]}>%</Text>
          </View>
        </View>
      </Card>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={() => {}}
        >
          <FontAwesome name="play" size={20} color={colors.white} />
          <Text style={[styles.actionText, { color: colors.white }]}>운동 시작</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.primaryBlue }]}
          onPress={() => {}}
        >
          <FontAwesome name="trophy" size={20} color={colors.white} />
          <Text style={[styles.actionText, { color: colors.white }]}>경쟁 참가</Text>
        </TouchableOpacity>
      </View>

      {/* Active Competition */}
      <Card style={styles.competitionCard}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>진행중인 경쟁</Text>
        <View style={styles.competitionHeader}>
          <Text style={[styles.competitionType, { color: colors.primary }]}>1:1 대결</Text>
          <Text style={[styles.competitionTime, { color: colors.text }]}>32:14</Text>
        </View>
        <View style={styles.competitionContent}>
          <View style={styles.player}>
            <Text style={[styles.playerName, { color: colors.text }]}>김운동</Text>
            <Text style={[styles.playerScore, { color: colors.primary }]}>324p</Text>
          </View>
          <Text style={[styles.vsText, { color: colors.gray[600] }]}>VS</Text>
          <View style={styles.player}>
            <Text style={[styles.playerName, { color: colors.text }]}>박근육</Text>
            <Text style={[styles.playerScore, { color: colors.gray[600] }]}>298p</Text>
          </View>
        </View>
      </Card>

      {data?.weeklyProgress && (
        <WeeklyProgress data={data.weeklyProgress} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF4B4B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileText: {
    marginLeft: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  levelText: {
    fontSize: 14,
    marginRight: 8,
  },
  levelProgress: {
    width: 100,
    height: 4,
  },
  notificationButton: {
    padding: 8,
  },
  summaryCard: {
    margin: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statUnit: {
    fontSize: 12,
    marginTop: 2,
  },
  quickActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  competitionCard: {
    margin: 16,
    padding: 16,
  },
  competitionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  competitionType: {
    fontSize: 14,
    fontWeight: '600',
  },
  competitionTime: {
    fontSize: 14,
  },
  competitionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  player: {
    alignItems: 'center',
  },
  playerName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  playerScore: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  vsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  retryButton: {
    padding: 12,
    borderRadius: 8,
  },
  retryText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
