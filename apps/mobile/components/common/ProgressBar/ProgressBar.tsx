import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../../../theme/colors';

export type ProgressBarSize = 'small' | 'medium' | 'large';
export type ProgressBarVariant = 'determinate' | 'indeterminate';

export interface ProgressBarProps extends React.ComponentProps<typeof View> {
  value?: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  color?: string;
  trackColor?: string;
  animated?: boolean;
  label?: string;
  style?: StyleProp<ViewStyle>;
}

const SIZES = {
  small: 4,
  medium: 8,
  large: 12,
} as const;

export const ProgressBar = React.forwardRef<View, ProgressBarProps>(({
  value = 0,
  variant = 'determinate',
  size = 'medium',
  color = colors.primary,
  trackColor = colors.gray[200],
  style,
  animated = true,
  label,
  ...props
}, ref) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const indeterminateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (variant === 'determinate' && animated) {
      Animated.timing(animatedWidth, {
        toValue: value,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [value, variant, animated]);

  useEffect(() => {
    if (variant === 'indeterminate') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(indeterminateAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(indeterminateAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }
  }, [variant]);

  const progressBarHeight = SIZES[size];

  const containerStyle = [
    styles.container,
    {
      height: progressBarHeight,
      backgroundColor: trackColor,
    },
    style,
  ];

  const getProgressWidth = (): any => {
    if (variant === 'determinate') {
      if (animated) {
        return animatedWidth.interpolate({
          inputRange: [0, 100],
          outputRange: ['0%', '100%'],
        });
      }
      return `${value}%`;
    }
    return '30%';
  };

  const getTransform = () => {
    if (variant === 'indeterminate') {
      return [{
        translateX: indeterminateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['-100%', '400%'],
        }),
      }];
    }
    return undefined;
  };

  const fillStyle = {
    ...styles.fill,
    backgroundColor: color,
    width: getProgressWidth(),
    transform: getTransform(),
  };

  return (
    <View
      {...props}
      ref={ref}
      style={containerStyle}
      testID="progress-bar"
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{
        now: variant === 'determinate' ? value : 0,
        min: 0,
        max: 100,
      }}
    >
      <Animated.View style={fillStyle} testID="progress-bar-fill" />
    </View>
  );
});

ProgressBar.displayName = 'ProgressBar';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
}); 