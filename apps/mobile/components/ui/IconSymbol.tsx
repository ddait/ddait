import { StyleSheet, Text, TextProps } from 'react-native';

interface IconSymbolProps extends TextProps {
  name: string;
  size?: number;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: string;
}

export function IconSymbol({ name, size = 24, weight = 'regular', color, style, ...props }: IconSymbolProps) {
  return (
    <Text
      style={[
        styles.base,
        {
          fontSize: size,
          fontWeight: weight === 'regular' ? '400' : weight === 'medium' ? '500' : weight === 'semibold' ? '600' : '700',
          color: color,
        },
        style,
      ]}
      {...props}>
      {name}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'SF Pro',
  },
});
