import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';

export default function ButtonScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Buttons</Text>
          <Button onPress={() => console.log('Pressed')}>
            Default Button
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