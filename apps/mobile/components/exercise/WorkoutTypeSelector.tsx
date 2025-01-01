import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, shadows } from '../../theme';

export interface WorkoutType {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
}

const DEFAULT_WORKOUT_TYPES: WorkoutType[] = [
  { id: 'weight', name: '웨이트', icon: 'barbell', color: colors.primary.red },
  { id: 'running', name: '러닝', icon: 'walk', color: colors.primary.blue },
  { id: 'cycling', name: '사이클', icon: 'bicycle', color: colors.primary.green },
  { id: 'swimming', name: '수영', icon: 'water', color: colors.secondary.teal },
  { id: 'yoga', name: '요가', icon: 'body', color: colors.secondary.purple },
  { id: 'hiking', name: '등산', icon: 'trail-sign', color: colors.secondary.orange },
  { id: 'basketball', name: '농구', icon: 'basketball', color: colors.primary.red },
  { id: 'soccer', name: '축구', icon: 'football', color: colors.primary.green },
];

interface WorkoutTypeSelectorProps {
  selected?: string;
  onSelect?: (type: WorkoutType) => void;
  types?: WorkoutType[];
}

export function WorkoutTypeSelector({
  selected,
  onSelect,
  types = DEFAULT_WORKOUT_TYPES,
}: WorkoutTypeSelectorProps) {
  return (
    <ScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.grid}>
        {types.map((type) => {
          const isSelected = selected === type.id;
          return (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.item,
                isSelected && styles.selectedItem,
                { borderColor: type.color },
              ]}
              onPress={() => onSelect?.(type)}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: type.color },
                  isSelected && styles.selectedIconContainer,
                ]}
              >
                <Ionicons
                  name={type.icon}
                  size={24}
                  color={isSelected ? type.color : colors.neutral[100]}
                />
              </View>
              <Text
                style={[
                  styles.name,
                  isSelected && { color: type.color },
                ]}
              >
                {type.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  item: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: colors.neutral[100],
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    ...shadows.sm,
  },
  selectedItem: {
    backgroundColor: colors.neutral[100],
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  selectedIconContainer: {
    backgroundColor: colors.neutral[100],
  },
  name: {
    ...typography.button,
    color: colors.neutral[700],
    textAlign: 'center',
  },
}); 