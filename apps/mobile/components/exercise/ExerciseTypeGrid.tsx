import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import  FontAwesome5  from '@expo/vector-icons/FontAwesome5';
import { Card } from '../common/Card';

type ExerciseType = {
  id: string;
  name: string;
  icon: keyof typeof FontAwesome5.glyphMap;
};

const EXERCISE_TYPES: ExerciseType[] = [
  { id: 'strength', name: '근력 운동', icon: 'dumbbell' },
  { id: 'cardio', name: '유산소', icon: 'running' },
  { id: 'yoga', name: '요가', icon: 'pray' },
  { id: 'stretching', name: '스트레칭', icon: 'walking' },
  { id: 'custom', name: '커스텀', icon: 'plus' },
];

export function ExerciseTypeGrid() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Card style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>운동 선택</Text>
      <View style={styles.grid}>
        {EXERCISE_TYPES.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[styles.item, { backgroundColor: colors.gray[100] }]}
            onPress={() => {}}
          >
            <FontAwesome5 name={type.icon} size={24} color={colors.primary} />
            <Text style={[styles.itemText, { color: colors.text }]}>{type.name}</Text>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  item: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
}); 