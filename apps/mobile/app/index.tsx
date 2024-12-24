import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card/Card';
import { ProgressBar } from '../components/common/ProgressBar/ProgressBar';
import { colors } from '../theme/colors';
import { ExerciseTimer } from '../components/exercise/ExerciseTimer/index';

export default function App() {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  const validateInput = (value: string) => {
    setText(value);
    if (value.length < 3) {
      setError('Text must be at least 3 characters long');
    } else {
      setError('');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* ProgressBar Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic ProgressBar</Text>
          <ProgressBar value={progress} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ProgressBar Sizes</Text>
          <View style={styles.progressGroup}>
            <ProgressBar size="small" value={progress} />
            <ProgressBar size="medium" value={progress} />
            <ProgressBar size="large" value={progress} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Colors</Text>
          <View style={styles.progressGroup}>
            <ProgressBar 
              value={progress} 
              color={colors.success[500]}
              trackColor={colors.success[100]}
            />
            <ProgressBar 
              value={progress} 
              color={colors.error[500]}
              trackColor={colors.error[100]}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Indeterminate Progress</Text>
          <ProgressBar variant="indeterminate" />
        </View>

        {/* Card Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Card</Text>
          <Card>
            <Card.Content>
              <Text>This is a basic card with only content.</Text>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card with Header and Footer</Text>
          <Card>
            <Card.Header>
              <Text style={styles.headerText}>Card Title</Text>
            </Card.Header>
            <Card.Content>
              <Text>This card has a header and footer.</Text>
            </Card.Content>
            <Card.Footer>
              <Text style={styles.footerText}>Footer content</Text>
            </Card.Footer>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clickable Card</Text>
          <Card onPress={() => Alert.alert('Clicked!', 'Card was clicked')}>
            <Card.Content>
              <Text>Click me! I'm an interactive card.</Text>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Variants</Text>
          <Card variant="elevated" style={styles.variantCard}>
            <Card.Content>
              <Text>Elevated Card</Text>
            </Card.Content>
          </Card>

          <Card variant="outlined" style={styles.variantCard}>
            <Card.Content>
              <Text>Outlined Card</Text>
            </Card.Content>
          </Card>

          <Card variant="filled" style={styles.variantCard}>
            <Card.Content>
              <Text>Filled Card</Text>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Styled Card</Text>
          <Card style={[styles.customCard]}>
            <Card.Content style={styles.customCardContent}>
              <Text style={styles.customCardText}>
                This card has custom styling applied to it.
              </Text>
            </Card.Content>
          </Card>
        </View>

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

        <View style={styles.section}>
          <View style={styles.row}>
            <Button 
              variant="primary"
              style={styles.halfWidth}
              onPress={() => console.log('Half Width 1')}
            >
              Half Width
            </Button>
            <Button 
              variant="secondary"
              style={styles.halfWidth}
              onPress={() => console.log('Half Width 2')}
            >
              Half Width
            </Button>
          </View>
        </View>

        <View style={styles.section}>
          <Button 
            variant="primary"
            style={[styles.fullWidth, styles.customHeight]}
            onPress={() => console.log('Custom Height')}
          >
            Custom Height
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
          <View style={styles.row}>
            <Button 
              variant="primary"
              style={styles.iconButton}
              onPress={() => console.log('Icon Button 1')}
            >
              +
            </Button>
            <Button 
              variant="secondary"
              style={styles.iconButton}
              onPress={() => console.log('Icon Button 2')}
            >
              -
            </Button>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercise Timer Examples</Text>
          <View style={styles.timerExamples}>
            <Text style={styles.label}>Basic Timer:</Text>
            <ExerciseTimer
              onTimeUpdate={(time) => console.log('Time updated:', time)}
            />

            <Text style={styles.label}>Timer with Target (5 seconds):</Text>
            <ExerciseTimer
              onTimeUpdate={(time) => console.log('Time updated:', time)}
              targetTime={5}
              onComplete={() => console.log('Timer completed!')}
            />

            <Text style={styles.label}>24-hour Format Timer:</Text>
            <ExerciseTimer
              onTimeUpdate={(time) => console.log('Time updated:', time)}
              format="24h"
              initialTime={3661} // 1 hour, 1 minute, 1 second
            />

            <Text style={styles.label}>Auto-start Timer:</Text>
            <ExerciseTimer
              onTimeUpdate={(time) => console.log('Time updated:', time)}
              autoStart
            />

            <Text style={styles.label}>Timer without Controls:</Text>
            <ExerciseTimer
              onTimeUpdate={(time) => console.log('Time updated:', time)}
              showControls={false}
              autoStart
            />
          </View>
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
  headerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    color: colors.gray[600],
  },
  variantCard: {
    marginBottom: 12,
  },
  customCard: {
    backgroundColor: colors.gray[800],
    borderRadius: 20,
  },
  customCardContent: {
    padding: 24,
  },
  customCardText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
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
  progressGroup: {
    gap: 16,
  },
  timerExamples: {
    gap: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray[700],
    marginTop: 10,
  },
}); 