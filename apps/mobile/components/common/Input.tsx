import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '../../theme/colors';

export interface InputProps extends TextInputProps {
  error?: string;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  required?: boolean;
}

export function Input({
  error,
  disabled,
  label,
  helperText,
  required,
  style,
  ...props
}: InputProps) {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          disabled && styles.inputDisabled,
          style,
        ]}
        placeholderTextColor={colors.gray[400]}
        editable={!disabled}
        {...props}
      />
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray[700],
    marginBottom: 4,
  },
  required: {
    color: colors.error[500],
  },
  input: {
    width: '100%',
    height: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    backgroundColor: colors.white,
    color: colors.gray[900],
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.error[500],
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
    color: colors.error[500],
    marginTop: 4,
  },
}); 