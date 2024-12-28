import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { useColorScheme } from '@hooks/useColorScheme';
import { Card } from '@components/common/Card';

interface User {
  id: string;
  name: string;
  profileImage: string;
  workoutStats: {
    totalWorkouts: number;
  };
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
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.text }]}>운동</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {user.workoutStats.totalWorkouts}
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