import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacityProps } from 'react-native';
import { colors, typography } from '../../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  label: string;
  disabled?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export function Button({
  variant = 'primary',
  label,
  disabled = false,
  style,
  labelStyle,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], disabled && styles.disabled, style]}
      disabled={disabled}
      {...props}
    >
      <Text style={[styles.label, styles[`${variant}Label`], disabled && styles.disabledLabel, labelStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primary: {
    backgroundColor: colors.primary.red,
  },
  secondary: {
    backgroundColor: colors.primary.blue,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.neutral[300],
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    ...typography.button,
    fontWeight: '600',
  },
  primaryLabel: {
    color: colors.neutral[100],
  },
  secondaryLabel: {
    color: colors.neutral[100],
  },
  ghostLabel: {
    color: colors.neutral[600],
  },
  disabledLabel: {
    color: colors.neutral[400],
  },
}); 