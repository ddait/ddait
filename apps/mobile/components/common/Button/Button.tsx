import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { ButtonProps } from './types';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@hooks/useColorScheme';

export function Button({
  title,
  onPress,
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  testID,
  style,
  textStyle,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      testID={testID}
      style={[
        styles.button,
        styles[type],
        styles[size],
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={colors.text}
          testID="loading-indicator"
        />
      ) : (
        <Text
          style={[
            styles.text,
            styles[`${type}Text`],
            disabled && styles.disabledText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primary: {
    backgroundColor: Colors.light.primaryBlue,
  },
  secondary: {
    backgroundColor: Colors.light.secondaryTeal,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  small: {
    height: 32,
  },
  medium: {
    height: 40,
  },
  large: {
    height: 48,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#000000',
  },
  ghostText: {
    color: Colors.light.primaryBlue,
  },
  disabledText: {
    color: '#666666',
  },
}); 