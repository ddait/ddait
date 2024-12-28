import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@hooks/useColorScheme';
import { Colors } from '@constants/Colors';
import { CompetitionSession } from '@components/competition/CompetitionSession/CompetitionSession';
import { useMatchingStore } from '@/stores/matchingStore';

export default function CompetitionSessionScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { opponent, reset } = useMatchingStore();

  const handleFinish = () => {
    reset();
    router.push('/competition/result' as any);
  };

  if (!opponent) {
    router.replace('/competition' as any);
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CompetitionSession
        opponent={opponent}
        onFinish={handleFinish}
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