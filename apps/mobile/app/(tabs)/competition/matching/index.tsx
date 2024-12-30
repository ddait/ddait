import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@hooks/useColorScheme';
import { Colors } from '@constants/Colors';
import { MatchingCard } from '@components/competition/MatchingCard/MatchingCard';
import { WaitingCard } from '@components/competition/WaitingCard';
import { useMatchingStore } from '@/stores/matchingStore';

export default function MatchingScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { status, opponent, setMatched, reset } = useMatchingStore();

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

  const handleAccept = () => {
    router.push('/competition/session' as any);
  };

  // 화면을 벗어날 때 매칭 상태 초기화
  useEffect(() => {
    return () => {
      if (status === 'searching') {
        reset();
      }
    };
  }, [status, reset]);

  const renderMatchingContent = () => {
    switch (status) {
      case 'idle':
        return (
          <MatchingCard 
            onStart={handleStart}
            onCancel={handleCancel}
            isMatching={false}
            estimatedWaitTime="약 1분"
          />
        );
      case 'searching':
        return (
          <MatchingCard 
            onStart={handleStart}
            onCancel={handleCancel}
            isMatching={true}
            estimatedWaitTime="약 1분"
          />
        );
      case 'matched':
        return (
          <WaitingCard
            opponent={opponent ? {
              name: opponent.name,
              level: opponent.level,
            } : null}
            estimatedTime="약 1분"
            onAccept={handleAccept}
            onDecline={handleCancel}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {renderMatchingContent()}
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