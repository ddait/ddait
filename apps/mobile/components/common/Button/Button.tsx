import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { useColorScheme } from '../../../hooks/useColorScheme';
import { Colors } from '../../../constants/Colors';

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  testID,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getBackgroundColor = () => {
    if (disabled) return colors.gray[300];
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.primaryBlue;
      case 'ghost':
        return 'transparent';
      default:
        return colors.primary;
    }
  };

  const getBorderColor = () => {
    if (disabled) return colors.gray[300];
    switch (variant) {
      case 'ghost':
        return colors.gray[400];
      default:
        return 'transparent';
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.gray[500];
    switch (variant) {
      case 'ghost':
        return colors.text;
      default:
        return colors.white;
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return { paddingVertical: 8, paddingHorizontal: 16 };
      case 'large':
        return { paddingVertical: 16, paddingHorizontal: 32 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 24 };
    }
  };

  const getTextSize = (): TextStyle => {
    switch (size) {
      case 'small':
        return { fontSize: 14 };
      case 'large':
        return { fontSize: 18 };
      default:
        return { fontSize: 16 };
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
        },
        getSizeStyle(),
        style,
      ]}
      activeOpacity={0.7}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator 
          color={getTextColor()} 
          testID="loading-indicator"
        />
      ) : (
        <Text
          style={[
            styles.text,
            getTextSize(),
            { color: getTextColor() },
            textStyle,
          ]}
        >
          {children}
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
    borderWidth: 1,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
}); 