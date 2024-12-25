import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { Colors } from '../../constants/Colors';
import { Button } from '../../components/common/Button';

interface MatchingCardProps {
  onStart: () => void;
  onCancel: () => void;
  isMatching: boolean;
  estimatedWaitTime?: string;
  error?: string;
}

export function MatchingCard({
  onStart,
  onCancel,
  isMatching,
  estimatedWaitTime,
  error,
}: MatchingCardProps) {
  return (
    <ThemedView style={styles.card}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>
          {isMatching ? '매칭 중...' : '1:1 대결'}
        </ThemedText>
        
        {isMatching && (
          <>
            <ActivityIndicator 
              size="large" 
              color={Colors.light.primary}
              style={styles.loader} 
            />
            {estimatedWaitTime && (
              <ThemedText style={styles.waitTime}>
                예상 대기 시간: {estimatedWaitTime}
              </ThemedText>
            )}
          </>
        )}

        {error && (
          <ThemedText style={styles.error}>
            {error}
          </ThemedText>
        )}

        <Button
          onPress={isMatching ? onCancel : onStart}
          style={[
            styles.button,
            isMatching && styles.cancelButton
          ]}
        >
          {isMatching ? '취소' : '매칭 시작'}
        </Button>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loader: {
    marginVertical: 20,
  },
  waitTime: {
    fontSize: 16,
    marginBottom: 20,
    color: Colors.light.text,
  },
  error: {
    color: Colors.light.error,
    marginBottom: 20,
  },
  button: {
    minWidth: 200,
  },
  cancelButton: {
    backgroundColor: Colors.light.error,
  },
}); 