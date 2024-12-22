import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle, Animated } from 'react-native';
import { colors } from '../../theme';

interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: number;
  style?: ViewStyle;
  animated?: boolean;
  duration?: number;
}

export function ProgressBar({
  progress,
  height = 8,
  style,
  animated = true,
  duration = 300,
}: ProgressBarProps) {
  const animatedWidth = new Animated.Value(0);

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedWidth, {
        toValue: progress,
        duration,
        useNativeDriver: false,
      }).start();
    } else {
      animatedWidth.setValue(progress);
    }
  }, [progress, animated, duration]);

  const width = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      style={[
        styles.container,
        { height },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.fill,
          { width },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.neutral[200],
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary.blue,
    borderRadius: 4,
  },
}); 