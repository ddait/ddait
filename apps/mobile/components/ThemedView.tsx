import { View, ViewProps, StyleSheet } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export function ThemedView(props: ViewProps) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
        props.style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
