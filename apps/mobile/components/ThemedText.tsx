import { Text, TextProps, StyleSheet } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface ThemedTextProps extends TextProps {
  type?: 'title' | 'defaultSemiBold' | 'default' | 'link';
}

export function ThemedText({ type = 'default', style, ...props }: ThemedTextProps) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Text
      style={[
        styles.base,
        styles[type],
        { color: Colors[colorScheme].text },
        style,
        type === 'link' && { color: Colors[colorScheme].tint }
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  defaultSemiBold: {
    fontWeight: '600',
  },
  default: {},
  link: {
    textDecorationLine: 'underline',
  },
});
