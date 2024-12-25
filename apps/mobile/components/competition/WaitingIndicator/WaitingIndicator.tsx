import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from './WaitingIndicator.styles';
import { WaitingIndicatorProps, WaitingStatus } from './types';
import { useColorScheme } from '../../../hooks/useColorScheme';
import { Colors } from '../../../constants/Colors';
import { Button } from '../../common/Button';

const DEFAULT_TIMEOUT = 30000; // 30 seconds
const DEFAULT_STATUS_MESSAGES = [
  '매칭 상대를 찾는 중...',
  '잠시만 기다려주세요...',
  '최적의 상대를 찾고 있습니다...',
  '곧 매칭이 완료됩니다...',
];

export default function WaitingIndicator({
  onTimeout,
  timeout = DEFAULT_TIMEOUT,
  initialMessage = DEFAULT_STATUS_MESSAGES[0],
  statusMessages = DEFAULT_STATUS_MESSAGES,
  testID = 'waiting-indicator',
}: WaitingIndicatorProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  const [status, setStatus] = useState<WaitingStatus>({
    isMatching: true,
    currentMessage: initialMessage,
    elapsedTime: 0,
  });

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        currentMessage: statusMessages[Math.floor(Math.random() * statusMessages.length)],
      }));
    }, 3000);

    const timeoutId = setTimeout(() => {
      setStatus(prev => ({ ...prev, isMatching: false }));
      onTimeout();
    }, timeout);

    const timerInterval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        elapsedTime: prev.elapsedTime + 1000,
      }));
    }, 1000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(timeoutId);
      clearInterval(timerInterval);
    };
  }, [timeout, statusMessages, onTimeout]);

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.spinnerContainer} testID="waiting-spinner">
        <ActivityIndicator 
          size="large" 
          color={Colors[theme].primary}
        />
      </View>
      
      <Text 
        style={[styles.statusText, { color: Colors[theme].text }]}
        testID="waiting-status"
      >
        {status.currentMessage}
      </Text>
      
      <Text 
        style={[styles.timerText, { color: Colors[theme].text }]}
        testID="waiting-timer"
      >
        {`${Math.floor(status.elapsedTime / 1000)}초 경과`}
      </Text>

      <Button
        onPress={onTimeout}
        variant="secondary"
        testID="cancel-matching-button"
      >
        매칭 취소
      </Button>
    </View>
  );
} 