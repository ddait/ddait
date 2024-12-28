import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { useColorScheme } from '@hooks/useColorScheme';

interface CompetitionOpponent {
  name: string;
  level: number;
  currentScore: number;
}

interface CompetitionSessionProps {
  opponent: CompetitionOpponent;
  onFinish: () => void;
}

export function CompetitionSession({ opponent, onFinish }: CompetitionSessionProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        {opponent.name}님과의 대결
      </Text>
      <Text style={[styles.score, { color: colors.text }]}>
        현재 점수: {opponent.currentScore}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  score: {
    fontSize: 18,
    marginBottom: 24,
  },
}); 