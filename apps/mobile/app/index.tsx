import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { colors } from '../theme/colors';

export default function App() {
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
        {/* Input Examples */}
        <View style={styles.section}>
          <Input
            placeholder="Default Input"
            value={text}
            onChangeText={validateInput}
            error={error}
          />
        </View>

        <View style={styles.section}>
          <Input
            placeholder="Disabled Input"
            value="Can't edit this"
            disabled
          />
        </View>

        <View style={styles.section}>
          <Input
            placeholder="Password Input"
            secureTextEntry
          />
        </View>

        {/* Button Examples */}
        <View style={styles.section}>
          <Button onPress={() => setText('')}>
            Clear Input
          </Button>
        </View>

        <View style={styles.section}>
          <Button 
            variant="primary"
            style={styles.fullWidth}
            onPress={() => console.log('Primary Full Width')}
          >
            Primary Full Width
          </Button>
        </View>

        <View style={styles.section}>
          <Button 
            variant="secondary"
            style={styles.fullWidth}
            onPress={() => console.log('Secondary Full Width')}
          >
            Secondary Full Width
          </Button>
        </View>

        <View style={[styles.section, styles.row]}>
          <Button 
            variant="primary"
            style={styles.halfWidth}
            onPress={() => console.log('Left Button')}
          >
            Left
          </Button>
          <Button 
            variant="secondary"
            style={styles.halfWidth}
            onPress={() => console.log('Right Button')}
          >
            Right
          </Button>
        </View>

        <View style={styles.section}>
          <Button 
            variant="ghost"
            style={styles.fullWidth}
            onPress={() => console.log('Ghost Button')}
          >
            Ghost Button
          </Button>
        </View>

        <View style={styles.section}>
          <Button 
            variant="primary"
            style={[styles.fullWidth, styles.customHeight]}
            onPress={() => console.log('Custom Height Button')}
          >
            Custom Height Button
          </Button>
        </View>

        <View style={styles.section}>
          <Button 
            variant="primary"
            style={[styles.fullWidth, styles.roundedButton]}
            onPress={() => console.log('Rounded Button')}
          >
            Rounded Button
          </Button>
        </View>

        <View style={styles.section}>
          <Button 
            variant="secondary"
            style={[styles.fullWidth, { borderWidth: 2 }]}
            onPress={() => console.log('Custom Border')}
          >
            Custom Border
          </Button>
        </View>

        <View style={styles.section}>
          <Button 
            variant="primary"
            style={[styles.fullWidth, { backgroundColor: colors.gray[800] }]}
            onPress={() => console.log('Custom Color')}
          >
            Custom Color
          </Button>
        </View>

        <View style={[styles.section, styles.row]}>
          <Button 
            variant="primary"
            style={styles.iconButton}
            onPress={() => console.log('Small Button')}
          >
            S
          </Button>
          <Button 
            variant="secondary"
            style={styles.iconButton}
            onPress={() => console.log('Medium Button')}
          >
            M
          </Button>
          <Button 
            variant="ghost"
            style={styles.iconButton}
            onPress={() => console.log('Large Button')}
          >
            L
          </Button>
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
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  fullWidth: {
    width: '100%',
  },
  halfWidth: {
    flex: 1,
  },
  customHeight: {
    height: 60,
  },
  roundedButton: {
    borderRadius: 25,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
}); 