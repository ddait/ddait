import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useColorScheme } from '@hooks/useColorScheme';
import { Colors } from '../../../constants/Colors';
import { Button } from '../../common/Button/Button';
import { styles } from './MatchingCard.styles';
import type { MatchingCardProps } from './types';

export function MatchingCard({
  onStart,
  onCancel,
  isMatching = false,
  estimatedWaitTime,
  error,
}: MatchingCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View
      testID="matching-card"
      style={[styles.container, { backgroundColor: colors.cardBackground }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>1:1 매칭</Text>

      {isMatching ? (
        <>
          <ActivityIndicator
            testID="matching-indicator"
            size="large"
            color={colors.primary}
            style={styles.matchingIndicator}
          />
          {estimatedWaitTime && (
            <Text style={[styles.waitTimeText, { color: colors.text }]}>
              예상 대기 시간: {estimatedWaitTime}
            </Text>
          )}
          <View style={styles.buttonContainer}>
            <Button
              testID="cancel-button"
              onPress={onCancel}
              title="취소"
              type="secondary"
            />
          </View>
        </>
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            onPress={onStart}
            title="매칭 시작"
            type="primary"
          />
        </View>
      )}

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
} 