import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Collapsible } from '@components/Collapsible';
import { ThemedText } from '@components/ThemedText';
import { ThemedView } from '@components/ThemedView';

export default function ExploreScreen() {
  return (
    <ThemedView style={styles.container}>
      <Collapsible title="Section 1">
        <ThemedText>Content for section 1</ThemedText>
      </Collapsible>
      <Collapsible title="Section 2">
        <ThemedText>Content for section 2</ThemedText>
      </Collapsible>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
