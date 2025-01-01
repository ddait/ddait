import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle, StyleProp } from 'react-native';
import { colors } from '../../../theme/colors';

export type ProgressBarSize = 'small' | 'medium' | 'large';
export type ProgressBarVariant = 'determinate' | 'indeterminate';

export interface ProgressBarProps {
  /**
   * The value of the progress indicator (0-100)
   */
  value?: number;
  
  /**
   * The size of the progress bar
   * @default 'medium'
   */
  size?: ProgressBarSize;
  
  /**
   * The variant of the progress bar
   * @default 'determinate'
   */
  variant?: ProgressBarVariant;
  
  /**
   * The color of the progress indicator
   */
  color?: string;
  
  /**
   * The color of the progress track
   */
  trackColor?: string;
  
  /**
   * Additional styles for the container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Test ID for testing
   */
  testID?: string;

  /**
   * Whether to animate the progress bar
   * @default true
   */
  animated?: boolean;

  /**
   * Accessibility label for the progress bar
   */
  label?: string;
}

export function ProgressBar({
  value = 0,
  size = 'medium',
  variant = 'determinate',
  color = colors.primary,
  trackColor = colors.gray[200],
  style,
  testID,
  animated = true,
  label,
}: ProgressBarProps) {
  const animation = useRef(new Animated.Value(0)).current;
  const indeterminateAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animated) {
      animation.setValue(value);
      return;
    }

    if (variant === 'determinate') {
      Animated.timing(animation, {
        toValue: value,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.loop(
        Animated.sequence([
          Animated.timing(indeterminateAnimation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(indeterminateAnimation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }
  }, [value, variant, animated]);

  const height = {
    small: 2,
    medium: 4,
    large: 8,
  }[size];

  const progressWidth = variant === 'determinate'
    ? animation.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
      })
    : indeterminateAnimation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0%', '50%', '100%'],
      });

  return (
    <View
      testID={testID || 'progress-bar'}
      style={[
        styles.container,
        { height },
        { backgroundColor: trackColor },
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={value ? {
        now: value,
        min: 0,
        max: 100
      } : undefined}
    >
      <Animated.View
        testID="progress-bar-fill"
        style={[
          styles.progress,
          {
            backgroundColor: color,
            width: !animated ? `${value}%` : progressWidth,
          } as any,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 999,
  },
}); 