import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, shadows } from '../../theme';

interface ExerciseSet {
  reps: number;
  weight: number;
  isComplete: boolean;
}

interface ExerciseCardProps {
  name: string;
  sets: ExerciseSet[];
  onSetsChange?: (sets: ExerciseSet[]) => void;
  onDelete?: () => void;
}

export function ExerciseCard({
  name,
  sets,
  onSetsChange,
  onDelete,
}: ExerciseCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSetComplete = (index: number) => {
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], isComplete: !newSets[index].isComplete };
    onSetsChange?.(newSets);
  };

  const handleSetChange = (index: number, field: keyof ExerciseSet, value: string) => {
    const numValue = parseInt(value) || 0;
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], [field]: numValue };
    onSetsChange?.(newSets);
  };

  const addSet = () => {
    const newSets = [...sets, { reps: 0, weight: 0, isComplete: false }];
    onSetsChange?.(newSets);
  };

  const removeSet = (index: number) => {
    const newSets = sets.filter((_, i) => i !== index);
    onSetsChange?.(newSets);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Ionicons
              name={isEditing ? 'checkmark-circle' : 'pencil'}
              size={24}
              color={colors.primary.blue}
            />
          </TouchableOpacity>
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
              <Ionicons name="trash" size={24} color={colors.semantic.error} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.setsList}>
        <View style={styles.setHeader}>
          <Text style={styles.setLabel}>세트</Text>
          <Text style={styles.setLabel}>kg</Text>
          <Text style={styles.setLabel}>회</Text>
          <View style={styles.setActionPlaceholder} />
        </View>

        {sets.map((set, index) => (
          <View key={index} style={styles.setRow}>
            <Text style={styles.setText}>{index + 1}</Text>
            {isEditing ? (
              <>
                <TextInput
                  style={styles.input}
                  value={set.weight.toString()}
                  onChangeText={(value) => handleSetChange(index, 'weight', value)}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  value={set.reps.toString()}
                  onChangeText={(value) => handleSetChange(index, 'reps', value)}
                  keyboardType="numeric"
                />
                <TouchableOpacity onPress={() => removeSet(index)}>
                  <Ionicons name="remove-circle" size={24} color={colors.semantic.error} />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.setText}>{set.weight}</Text>
                <Text style={styles.setText}>{set.reps}</Text>
                <TouchableOpacity onPress={() => handleSetComplete(index)}>
                  <Ionicons
                    name={set.isComplete ? 'checkmark-circle' : 'ellipse-outline'}
                    size={24}
                    color={set.isComplete ? colors.semantic.success : colors.neutral[400]}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        ))}
      </View>

      {isEditing && (
        <TouchableOpacity style={styles.addButton} onPress={addSet}>
          <Ionicons name="add-circle" size={24} color={colors.primary.blue} />
          <Text style={styles.addButtonText}>세트 추가</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral[100],
    borderRadius: 16,
    padding: spacing.md,
    ...shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  deleteButton: {
    marginLeft: spacing.sm,
  },
  title: {
    ...typography.h3,
    color: colors.neutral[900],
  },
  setsList: {
    marginBottom: spacing.sm,
  },
  setHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  setLabel: {
    ...typography.caption,
    color: colors.neutral[500],
    width: 50,
    textAlign: 'center',
  },
  setActionPlaceholder: {
    width: 24,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  setText: {
    ...typography.body,
    color: colors.neutral[700],
    width: 50,
    textAlign: 'center',
  },
  input: {
    ...typography.body,
    width: 50,
    textAlign: 'center',
    padding: spacing.xs,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: 4,
    color: colors.neutral[900],
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    gap: spacing.xs,
  },
  addButtonText: {
    ...typography.button,
    color: colors.primary.blue,
  },
}); 