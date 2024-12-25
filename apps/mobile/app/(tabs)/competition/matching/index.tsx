import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { MatchingCard } from '@/components/competition/MatchingCard/MatchingCard';

export default function MatchingScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const [isMatching, setIsMatching] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleStart = () => {
    setError(undefined);
    setIsMatching(true);
    // TODO: Implement matching logic with backend
    // For now, simulate a match after 3 seconds
    setTimeout(() => {
      router.push('./waiting');
    }, 3000);
  };

  const handleCancel = () => {
    setIsMatching(false);
    // TODO: Cancel matching request to backend
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <MatchingCard
        onStart={handleStart}
        onCancel={handleCancel}
        isMatching={isMatching}
        estimatedWaitTime={isMatching ? '약 1분' : undefined}
        error={error}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 