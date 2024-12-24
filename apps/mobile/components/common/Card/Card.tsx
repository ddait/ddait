import React from 'react';
import { View, StyleSheet, Pressable, ViewStyle, StyleProp } from 'react-native';
import { colors } from '../../../theme/colors';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps {
  variant?: CardVariant;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  onPress?: () => void;
  testID?: string;
}

interface CardComponent extends React.FC<CardProps> {
  Header: typeof CardHeader;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
}

interface CardSubComponentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const CardHeader: React.FC<CardSubComponentProps> = ({ children, style, testID }) => (
  <View style={[styles.header, style]} testID={testID}>{children}</View>
);

const CardContent: React.FC<CardSubComponentProps> = ({ children, style, testID }) => (
  <View style={[styles.content, style]} testID={testID}>{children}</View>
);

const CardFooter: React.FC<CardSubComponentProps> = ({ children, style, testID }) => (
  <View style={[styles.footer, style]} testID={testID}>{children}</View>
);

export const Card: CardComponent = ({ variant = 'elevated', style, children, onPress, testID = 'test-card' }) => {
  const cardStyle = [
    styles.card,
    variant === 'elevated' && styles.elevated,
    variant === 'outlined' && styles.outlined,
    variant === 'filled' && styles.filled,
    style,
  ];

  if (onPress) {
    return (
      <Pressable style={cardStyle} onPress={onPress} testID={testID}>
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle} testID={testID}>{children}</View>;
};

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  elevated: {
    elevation: 2,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  filled: {
    backgroundColor: colors.gray[100],
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  content: {
    padding: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
}); 