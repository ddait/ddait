import React from 'react';
import { Text, TextStyle } from 'react-native';

interface ThemedTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const ThemedText: React.FC<ThemedTextProps> = ({ children, style }) => {
  const baseStyle: TextStyle = {
    fontSize: 16,
    lineHeight: 24,
  };

  const themeStyle: TextStyle = {
    color: '#000000',
  };

  return (
    <Text style={[baseStyle, {}, themeStyle, style, false]}>
      {children}
    </Text>
  );
};

export default ThemedText; 