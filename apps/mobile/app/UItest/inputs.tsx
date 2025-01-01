import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../../components/common/Input';
import { colors } from '../../theme/colors';

export default function InputScreen() {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const validateInput = (value: string) => {
    setText(value);
    if (value.length < 3) {
      setError('Text must be at least 3 characters long');
    } else {
      setError('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Input</Text>
          <Input
            placeholder="Default Input"
            value={text}
            onChangeText={validateInput}
            error={error}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disabled Input</Text>
          <Input
            placeholder="Disabled Input"
            value="Can't edit this"
            disabled
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Password Input</Text>
          <Input
            placeholder="Password Input"
            secureTextEntry
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Input with Label</Text>
          <Input
            label="Username"
            placeholder="Enter your username"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Input with Helper Text</Text>
          <Input
            label="Email"
            placeholder="Enter your email"
            helperText="We'll never share your email with anyone else."
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Required Input</Text>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            required
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Input with Error</Text>
          <Input
            label="Password"
            placeholder="Enter password"
            error="Password must be at least 8 characters long"
            secureTextEntry
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: colors.gray[800],
  },
}); 