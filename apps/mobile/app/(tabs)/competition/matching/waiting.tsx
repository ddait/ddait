import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
// import WaitingIndicator from '../../../components/competition/WaitingIndicator/WaitingIndicator';
import WaitingIndicator from '../../../../components/competition/WaitingIndicator/WaitingIndicator';
import { Colors } from '../../../../constants/Colors';
import { useColorScheme } from '../../../../hooks/useColorScheme';

export default function WaitingScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  const handleTimeout = () => {
    // 매칭 실패 또는 취소 시 이전 화면으로 이동
    router.back();
  };

  const handleMatchFound = () => {
    // 매칭 성공 시 결과 화면으로 이동
    router.push({
      pathname: "/(tabs)/competition"
    });
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: Colors[theme].background }
    ]}>
      <WaitingIndicator
        onTimeout={handleTimeout}
        timeout={30000}
        testID="matching-waiting-indicator"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 