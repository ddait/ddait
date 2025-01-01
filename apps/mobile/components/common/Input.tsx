import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle, StyleProp } from 'react-native';
import { colors } from '../../theme/colors';

export interface InputProps extends TextInputProps {
  error?: string;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  required?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export function Input({
  error,
  disabled,
  label,
  helperText,
  required,
  style,
  testID,
  containerStyle,
  ...props
}: InputProps) {
  return (
    <View style={[styles.wrapper]} testID={`${testID || 'input'}-wrapper`}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <View 
        style={[
          styles.inputContainer,
          error && { borderColor: '#FF4444' },
          containerStyle,
        ]} 
        testID={`${testID || 'input'}-container`}
      >
        <TextInput
          style={[
            styles.input,
            disabled && styles.inputDisabled,
            style,
          ]}
          testID={testID || 'input'}
          placeholderTextColor={colors.gray[400]}
          editable={!disabled}
          {...props}
        />
      </View>
      {helperText && <Text style={styles.helperText} testID={`${testID || 'input'}-helper`}>{helperText}</Text>}
      {error && <Text style={styles.errorText} testID={`${testID || 'input'}-error`}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray[700],
    marginBottom: 4,
  },
  required: {
    color: '#FF4444',
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  input: {
    height: 44,
    paddingHorizontal: 12,
    color: colors.text,
    fontSize: 16,
  },
  inputDisabled: {
    backgroundColor: colors.gray[100],
    color: colors.gray[500],
  },
  helperText: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#FF4444',
    marginTop: 4,
  },
}); 