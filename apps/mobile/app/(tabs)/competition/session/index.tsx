import React from 'react';
import { useRouter } from 'expo-router';
import { CompetitionSession } from '@/components/competition/CompetitionSession/CompetitionSession';
import { useMatchingStore } from '@/stores/matchingStore';

export default function CompetitionSessionScreen() {
  const router = useRouter();
  const { opponent, reset } = useMatchingStore();

  const handleComplete = () => {
    reset();
    router.replace('/competition' as any);
  };

  const handleGiveUp = () => {
    reset();
    router.replace('/competition' as any);
  };

  // 상대방 정보가 없으면 경쟁 화면으로 돌아감
  if (!opponent) {
    router.replace('/competition' as any);
    return null;
  }

  return (
    <CompetitionSession
      opponent={opponent}
      onComplete={handleComplete}
      onGiveUp={handleGiveUp}
    />
  );
} 