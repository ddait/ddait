import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '../../../hooks/useColorScheme';
import { Colors } from '../../../constants/Colors';
import { WaitingCard } from '../../../components/competition/WaitingCard';
import type { Opponent } from '../../../components/competition/WaitingCard';

export default function WaitingScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const [opponent, setOpponent] = useState<Opponent | undefined>();
  const [isOpponentReady, setIsOpponentReady] = useState(false);

  useEffect(() => {
    // TODO: Implement WebSocket connection for real-time matching
    // For now, simulate finding an opponent after 2 seconds
    const opponentTimer = setTimeout(() => {
      setOpponent({
        name: '홍길동',
        level: 5,
        winRate: 60,
      });
    }, 2000);

    // Simulate opponent being ready after 4 seconds
    const readyTimer = setTimeout(() => {
      setIsOpponentReady(true);
    }, 4000);

    return () => {
      clearTimeout(opponentTimer);
      clearTimeout(readyTimer);
    };
  }, []);

  const handleStart = () => {
    // TODO: Implement competition start logic with backend
    router.push('./session');
  };

  const handleCancel = () => {
    // TODO: Implement cancellation logic with backend
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <WaitingCard
        onStart={handleStart}
        onCancel={handleCancel}
        opponent={opponent}
        isOpponentReady={isOpponentReady}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 