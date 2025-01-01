import React from 'react';
import { View, StyleSheet, ViewStyle, ViewProps } from 'react-native';
import { colors, shadows, spacing } from '../../theme';

export type CardVariant = 'exercise' | 'competition' | 'achievement';

interface CardProps extends ViewProps {
  variant?: CardVariant;
  style?: ViewStyle;
}

export function Card({ variant, style, children, ...props }: CardProps) {
  return (
    <View
      style={[
        styles.container,
        variant && styles[variant],
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral[100],
    borderRadius: 16,
    padding: spacing.md,
    ...shadows.sm,
  },
  exercise: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.blue,
  },
  competition: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.red,
  },
  achievement: {
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary.purple,
  },
}); 