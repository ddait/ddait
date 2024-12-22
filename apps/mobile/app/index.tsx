import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/common/Button';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={() => console.log('Primary pressed')}>
        Primary Button
      </Button>
      
      <View style={styles.spacing} />
      
      <Button 
        variant="secondary"
        onPress={() => console.log('Secondary pressed')}
      >
        Secondary Button
      </Button>
      
      <View style={styles.spacing} />
      
      <Button 
        variant="ghost"
        onPress={() => console.log('Ghost pressed')}
      >
        Ghost Button
      </Button>
      
      <View style={styles.spacing} />
      
      <Button disabled>
        Disabled Button
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  spacing: {
    height: 16,
  },
}); 