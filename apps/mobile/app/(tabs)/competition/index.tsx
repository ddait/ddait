import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
// import { Button } from '../../../components/common/Button';
import { Button } from '../../../components/common/Button/Button'
import { useColorScheme } from '../../../hooks/useColorScheme';
import { Colors } from '../../../constants/Colors';
import { useMatchingStore } from '../../../stores/matchingStore';

export default function CompetitionScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const { startMatching } = useMatchingStore();

  const handleMatchingPress = () => {
    startMatching(); // 매칭 상태 초기화 및 시작
    router.push('/competition/matching' as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <Button
        onPress={handleMatchingPress}
        testID="start-matching-button"
        title='1:1 매칭 시작'
        type="primary"
      ></Button>
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