import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { createStyles } from './WorkoutTypeSelector.styles';
import { IWorkoutType, IWorkoutTypeSelectorProps, WorkoutCategory } from './types';

const WORKOUT_TYPES: IWorkoutType[] = [
  {
    id: '1',
    name: 'Running',
    icon: '🏃‍♂️',
    category: 'cardio',
    description: 'Cardio exercise'
  },
  {
    id: '2',
    name: 'Weight Lifting',
    icon: '🏋️‍♂️',
    category: 'strength',
    description: 'Strength training'
  },
  // Add more workout types as needed
];

const CATEGORIES: WorkoutCategory[] = ['cardio', 'strength', 'flexibility', 'sports'];

export const WorkoutTypeSelector: React.FC<IWorkoutTypeSelectorProps> = ({
  selectedType,
  onSelect,
  disabled = false,
  initialCategory
}) => {
  const [selectedCategory, setSelectedCategory] = useState<WorkoutCategory | undefined>(
    initialCategory
  );
  const styles = createStyles();

  const filteredWorkouts = useCallback(() => {
    if (!selectedCategory) return WORKOUT_TYPES;
    return WORKOUT_TYPES.filter(workout => workout.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryPress = useCallback((category: WorkoutCategory) => {
    if (disabled) return;
    setSelectedCategory(prev => prev === category ? undefined : category);
  }, [disabled]);

  const handleWorkoutPress = useCallback((workoutId: string) => {
    if (disabled) return;
    onSelect(workoutId);
  }, [disabled, onSelect]);

  return (
    <View style={[styles.container, disabled && styles.disabled]} testID="workout-type-selector">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => handleCategoryPress(category)}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityLabel={`${category} category`}
            accessibilityState={{ selected: selectedCategory === category }}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.workoutList}>
        {filteredWorkouts().map((workout) => (
          <TouchableOpacity
            key={workout.id}
            style={[
              styles.workoutItem,
              selectedType === workout.id && styles.workoutItemActive
            ]}
            onPress={() => handleWorkoutPress(workout.id)}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityLabel={`Select ${workout.name}`}
            accessibilityState={{ selected: selectedType === workout.id }}
          >
            <Text style={styles.workoutIcon}>{workout.icon}</Text>
            <View style={styles.workoutInfo}>
              <Text
                style={[
                  styles.workoutName,
                  selectedType === workout.id && styles.workoutNameActive
                ]}
              >
                {workout.name}
              </Text>
              {workout.description && (
                <Text
                  style={[
                    styles.workoutDescription,
                    selectedType === workout.id && styles.workoutDescriptionActive
                  ]}
                >
                  {workout.description}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}; 