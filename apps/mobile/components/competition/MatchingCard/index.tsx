import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '../../../hooks/useColorScheme';
import { Colors } from '../../../constants/Colors';
import { Button } from '../../common/Button';

export interface MatchingCardProps {
  onStartMatching: () => void;
}

export function MatchingCard({ onStartMatching }: MatchingCardProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>
        1:1 매칭 대결
      </Text>
      <Text style={[styles.description, { color: Colors[theme].text }]}>
        비슷한 레벨의 상대와 실시간으로 대결해보세요!
      </Text>
      <Button
        onPress={onStartMatching}
        variant="primary"
        testID="start-matching-button"
      >
        매칭 시작하기
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    opacity: 0.8,
  },
}); 