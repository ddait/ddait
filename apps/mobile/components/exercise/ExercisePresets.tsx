import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Card } from '../common/Card';
import { FontAwesome } from '@expo/vector-icons';

interface ExercisePreset {
  id: string;
  name: string;
  description: string;
  exercises: Array<{
    name: string;
    sets: number;
  }>;
}

const MOCK_PRESETS: ExercisePreset[] = [
  {
    id: '1',
    name: '상체 운동',
    description: '가슴, 어깨, 삼두를 타겟팅하는 운동',
    exercises: [
      { name: '벤치프레스', sets: 3 },
      { name: '숄더프레스', sets: 3 },
      { name: '푸시업', sets: 3 },
    ],
  },
  {
    id: '2',
    name: '하체 운동',
    description: '하체 근력 강화를 위한 운동',
    exercises: [
      { name: '스쿼트', sets: 4 },
      { name: '런지', sets: 3 },
      { name: '레그프레스', sets: 3 },
    ],
  },
];

export function ExercisePresets() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Card style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>운동 프리셋</Text>
      <View style={styles.list}>
        {MOCK_PRESETS.map((preset) => (
          <TouchableOpacity
            key={preset.id}
            style={[styles.item, { backgroundColor: colors.gray[100] }]}
          >
            <View style={styles.itemContent}>
              <Text style={[styles.itemName, { color: colors.text }]}>
                {preset.name}
              </Text>
              <Text style={[styles.itemDescription, { color: colors.gray[600] }]}>
                {preset.description}
              </Text>
              <View style={styles.exerciseList}>
                {preset.exercises.map((exercise, index) => (
                  <Text
                    key={index}
                    style={[styles.exerciseItem, { color: colors.gray[500] }]}
                  >
                    {exercise.name} ({exercise.sets}세트)
                  </Text>
                ))}
              </View>
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
    gap: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  exerciseList: {
    marginTop: 8,
    gap: 4,
  },
  exerciseItem: {
    fontSize: 12,
  },
}); 