import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import { useColorScheme } from '@hooks/useColorScheme';
import { Button } from '@/components/common/Button/Button';
import { Card } from '../../../components/common/Card';

export default function WorkoutCompleteScreen() {
  const { type, duration } = useLocalSearchParams<{ type: string; duration: string }>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const handleFinish = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: '운동 완료',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          운동 완료!
        </Text>
        <Card style={styles.summaryCard}>
          <Text style={[styles.summaryTitle, { color: colors.text }]}>운동 요약</Text>
          <View style={styles.summaryContent}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: colors.gray[600] }]}>운동 종류</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{type}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: colors.gray[600] }]}>운동 시간</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{duration}분</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: colors.gray[600] }]}>소모 칼로리</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>320 kcal</Text>
            </View>
          </View>
        </Card>
        <Button
          variant="primary"
          onPress={handleFinish}
          style={styles.finishButton}
        >
          완료
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  summaryCard: {
    padding: 20,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  summaryContent: {
    gap: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  finishButton: {
    marginTop: 32,
  },
}); 