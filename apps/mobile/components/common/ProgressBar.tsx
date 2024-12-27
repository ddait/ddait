import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export interface ProgressBarProps {
  progress: number;
  testID?: string;
  style?: ViewStyle;
  onProgressUpdate?: (progress: number) => void;
}

export function ProgressBar({ progress, testID, style, onProgressUpdate }: ProgressBarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View
      testID={testID}
      style={[styles.container, { backgroundColor: colors.background }, style]}
      onTouchMove={(e) => {
        if (onProgressUpdate) {
          const { locationX, pageX } = e.nativeEvent;
          const progress = Math.min(Math.max((locationX / pageX) * 100, 0), 100);
          onProgressUpdate(progress);
        }
      }}
    >
      <View
        style={[
          styles.progress,
          {
            width: `${Math.min(Math.max(progress, 0), 100)}%`,
            backgroundColor: colors.primary,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
}); 