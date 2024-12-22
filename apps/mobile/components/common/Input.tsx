import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import { colors } from '../../theme/colors';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  error?: string;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export function Input({
  error,
  disabled,
  style,
  containerStyle,
  ...props
}: InputProps) {
  return (
    <View 
      testID="input-container" 
      style={[
        styles.container,
        error && styles.containerError,
        containerStyle,
      ]}
    >
      <TextInput
        testID="input"
        style={[
          styles.input,
          disabled && styles.inputDisabled,
          style,
        ]}
        placeholderTextColor={colors.gray[400]}
        editable={!disabled}
        {...props}
      />
      {error && (
        <Text testID="input-error" style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  containerError: {
    borderColor: colors.red[500],
  },
  input: {
    height: 48,
    paddingHorizontal: 16,
    color: colors.gray[900],
    fontSize: 16,
  },
  inputDisabled: {
    backgroundColor: colors.gray[100],
    color: colors.gray[400],
  },
  errorText: {
    marginTop: 4,
    marginHorizontal: 16,
    marginBottom: 8,
    color: colors.red[500],
    fontSize: 12,
  },
}); 