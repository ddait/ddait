import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Card } from '../common/Card';
import { FontAwesome } from '@expo/vector-icons';

interface CustomExercise {
  name: string;
  type: 'STRENGTH' | 'CARDIO';
  targetMuscles: string[];
  description: string;
}

export function CustomExerciseForm() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [exercise, setExercise] = useState<CustomExercise>({
    name: '',
    type: 'STRENGTH',
    targetMuscles: [],
    description: '',
  });

  const [showForm, setShowForm] = useState(false);

  const handleSubmit = () => {
    // TODO: API 연동
    console.log('Submit custom exercise:', exercise);
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <Card style={styles.container}>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.gray[100] }]}
          onPress={() => setShowForm(true)}
        >
          <FontAwesome name="plus" size={24} color={colors.primary} />
          <Text style={[styles.addButtonText, { color: colors.text }]}>
            커스텀 운동 추가
          </Text>
        </TouchableOpacity>
      </Card>
    );
  }

  return (
    <Card style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>커스텀 운동 추가</Text>
      
      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>운동 이름</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.gray[100], color: colors.text }]}
            value={exercise.name}
            onChangeText={(text) => setExercise({ ...exercise, name: text })}
            placeholder="운동 이름을 입력하세요"
            placeholderTextColor={colors.gray[400]}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>운동 타입</Text>
          <View style={styles.typeButtons}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                { backgroundColor: exercise.type === 'STRENGTH' ? colors.primary : colors.gray[100] },
              ]}
              onPress={() => setExercise({ ...exercise, type: 'STRENGTH' })}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  { color: exercise.type === 'STRENGTH' ? colors.white : colors.text },
                ]}
              >
                근력 운동
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                { backgroundColor: exercise.type === 'CARDIO' ? colors.primary : colors.gray[100] },
              ]}
              onPress={() => setExercise({ ...exercise, type: 'CARDIO' })}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  { color: exercise.type === 'CARDIO' ? colors.white : colors.text },
                ]}
              >
                유산소
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>설명</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              { backgroundColor: colors.gray[100], color: colors.text },
            ]}
            value={exercise.description}
            onChangeText={(text) => setExercise({ ...exercise, description: text })}
            placeholder="운동에 대한 설명을 입력하세요"
            placeholderTextColor={colors.gray[400]}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton, { backgroundColor: colors.gray[100] }]}
            onPress={() => setShowForm(false)}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.submitButton, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
          >
            <Text style={[styles.buttonText, { color: colors.white }]}>추가</Text>
          </TouchableOpacity>
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
  form: {
    gap: 16,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  textArea: {
    height: 100,
    padding: 12,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 