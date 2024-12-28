import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@hooks/useColorScheme';
import { Colors } from '@constants/Colors';
import { MatchingCard } from '@components/competition/MatchingCard/MatchingCard';
import { useMatchingStore } from '@/stores/matchingStore';

export default function MatchingScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { status, setMatched, reset } = useMatchingStore();

  const handleCancel = () => {
    reset();
    router.back();
  };

  const handleStart = () => {
    // 임시로 3초 후에 매칭이 성공했다고 가정
    setTimeout(() => {
      setMatched({
        name: '홍길동',
        level: 5,
        currentScore: 0,
      });
      router.push('/competition/session' as any);
    }, 3000);
  };

  // 화면을 벗어날 때 매칭 상태 초기화
  useEffect(() => {
    return () => {
      if (status === 'searching') {
        reset();
      }
    };
  }, [status, reset]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <MatchingCard 
        onCancel={handleCancel}
        onStart={handleStart}
        isMatching={status === 'searching'}
        estimatedWaitTime="약 1분"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
}); 