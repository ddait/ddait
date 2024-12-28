import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { useColorScheme } from '@hooks/useColorScheme';
import { Card } from '@components/common/Card';

export interface Opponent {
  name: string;
  level: number;
}

interface WaitingCardProps {
  opponent: Opponent | null;
  estimatedTime: string;
  onAccept: () => void;
  onDecline: () => void;
}

export function WaitingCard({ opponent, estimatedTime, onAccept, onDecline }: WaitingCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Card style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        {opponent ? '매칭 완료!' : '매칭 대기 중...'}
      </Text>
      {opponent ? (
        <View style={styles.opponentInfo}>
          <Text style={[styles.opponentName, { color: colors.text }]}>
            {opponent.name}
          </Text>
          <Text style={[styles.opponentLevel, { color: colors.text }]}>
            Lv.{opponent.level}
          </Text>
        </View>
      ) : (
        <Text style={[styles.estimatedTime, { color: colors.text }]}>
          예상 대기 시간: {estimatedTime}
        </Text>
      )}
    </Card>
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
  opponentInfo: {
    alignItems: 'center',
    gap: 8,
  },
  opponentName: {
    fontSize: 18,
    fontWeight: '500',
  },
  opponentLevel: {
    fontSize: 16,
  },
  estimatedTime: {
    fontSize: 16,
    marginTop: 8,
  },
}); 