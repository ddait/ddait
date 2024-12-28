import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { useColorScheme } from '@hooks/useColorScheme';
import { Card } from '@components/common/Card';

interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  workoutCount: number;
  competitionCount: number;
  winCount: number;
}

interface ProfileProps {
  user: User;
  onEdit?: () => void;
}

export function Profile({ user, onEdit }: ProfileProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.name, { color: colors.text }]}>
          {user.name}
        </Text>
        <Text style={[styles.email, { color: colors.gray[600] }]}>
          {user.email}
        </Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.text }]}>운동</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {user.workoutCount}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.text }]}>경쟁</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {user.competitionCount}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.text }]}>승리</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {user.winCount}
          </Text>
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
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
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