import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../common/Card';
import { ProgressBar } from '../common/ProgressBar';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

interface WeeklyProgressProps {
  data: {
    days: Array<{
      date: string;
      calories: number;
      duration: number;
      completed: boolean;
    }>;
    weeklyGoal: {
      target: number;
      current: number;
    };
  };
}

export function WeeklyProgress({ data }: WeeklyProgressProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Card style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>주간 진행 상황</Text>
      <View style={styles.progressContainer}>
        <View style={styles.goalProgress}>
          <Text style={[styles.goalText, { color: colors.text }]}>
            주간 목표 달성률
          </Text>
          <ProgressBar 
            progress={(data.weeklyGoal.current / data.weeklyGoal.target) * 100}
            style={styles.progressBar}
          />
        </View>
        <View style={styles.daysContainer}>
          {data.days.map((day, index) => (
            <View key={index} style={styles.dayItem}>
              <View style={[
                styles.dayIndicator,
                { backgroundColor: day.completed ? colors.primary : colors.gray[300] }
              ]} />
              <Text style={[styles.dayText, { color: colors.text }]}>
                {day.date}
              </Text>
            </View>
          ))}
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressContainer: {
    gap: 16,
  },
  goalProgress: {
    gap: 8,
  },
  goalText: {
    fontSize: 14,
  },
  progressBar: {
    height: 4,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dayItem: {
    alignItems: 'center',
    gap: 4,
  },
  dayIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dayText: {
    fontSize: 12,
  },
}); 