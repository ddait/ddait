import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Card } from '../common/Card';
import { FontAwesome } from '@expo/vector-icons';

interface RecentExercise {
  id: string;
  name: string;
  type: string;
  lastUsed: string;
}

const MOCK_RECENT_EXERCISES: RecentExercise[] = [
  {
    id: '1',
    name: '벤치 프레스',
    type: '근력 운동',
    lastUsed: '2024-03-10',
  },
  {
    id: '2',
    name: '조깅',
    type: '유산소',
    lastUsed: '2024-03-09',
  },
];

export function RecentExercises() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Card style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>최근 운동</Text>
      <View style={styles.list}>
        {MOCK_RECENT_EXERCISES.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={[styles.item, { backgroundColor: colors.gray[100] }]}
          >
            <View style={styles.itemContent}>
              <Text style={[styles.itemName, { color: colors.text }]}>
                {exercise.name}
              </Text>
              <Text style={[styles.itemType, { color: colors.gray[600] }]}>
                {exercise.type}
              </Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color={colors.gray[400]} />
          </TouchableOpacity>
        ))}
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
  list: {
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemType: {
    fontSize: 14,
    marginTop: 4,
  },
}); 