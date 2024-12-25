import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useColorScheme } from '../../../hooks/useColorScheme';
import { Colors } from '../../../constants/Colors';
import { Button } from '../../common/Button/Button';
import { styles } from './WaitingCard.styles';
import type { WaitingCardProps } from './types';

export function WaitingCard({
  onStart,
  onCancel,
  opponent,
  isOpponentReady = false,
}: WaitingCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View
      testID="waiting-card"
      style={[styles.container, { backgroundColor: colors.cardBackground }]}
    >
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
          <Text style={[styles.opponentWinRate, { color: colors.text }]}>
            승률: {opponent.winRate}%
          </Text>
        </View>
      ) : (
        <ActivityIndicator
          testID="waiting-indicator"
          size="large"
          color={colors.primary}
          style={styles.waitingIndicator}
        />
      )}

      <View style={styles.buttonContainer}>
        {opponent && isOpponentReady ? (
          <Button
            onPress={onStart}
            title="대결 시작"
            type="primary"
          />
        ) : (
          <Button
            testID="cancel-button"
            onPress={onCancel}
            title="취소"
            type="secondary"
          />
        )}
      </View>
    </View>
  );
} 