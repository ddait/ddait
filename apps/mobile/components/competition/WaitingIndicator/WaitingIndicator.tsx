import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useColorScheme } from '../../../hooks/useColorScheme';
import { Colors } from '../../../constants/Colors';

interface WaitingIndicatorProps {
  message?: string;
  style?: ViewStyle;
}

export function WaitingIndicator({ message = '매칭 중...', style }: WaitingIndicatorProps) {
  const [dots, setDots] = useState('');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View testID="waiting-indicator" style={[styles.container, style]}>
      <Text style={[styles.message, { color: colors.text }]}>
        {message}
      </Text>
      <Text testID="dots-animation" style={[styles.dots, { color: colors.text }]}>
        {dots}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  message: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  dots: {
    fontSize: 24,
    fontWeight: 'bold',
    height: 24,
    minWidth: 30,
    textAlign: 'left',
  },
}); 