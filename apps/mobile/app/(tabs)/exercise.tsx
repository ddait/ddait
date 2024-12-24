import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExerciseTimer } from '../../components/exercise/ExerciseTimer/ExerciseTimer';
import { colors } from '../../theme/colors';

export default function ExerciseScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Timer</Text>
          <ExerciseTimer
            onTimeUpdate={(time) => console.log('Time updated:', time)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timer with Target (5 seconds)</Text>
          <ExerciseTimer
            onTimeUpdate={(time) => console.log('Time updated:', time)}
            targetTime={5}
            onComplete={() => console.log('Timer completed!')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>24-hour Format Timer</Text>
          <ExerciseTimer
            onTimeUpdate={(time) => console.log('Time updated:', time)}
            format="24h"
            initialTime={3661} // 1 hour, 1 minute, 1 second
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Auto-start Timer</Text>
          <ExerciseTimer
            onTimeUpdate={(time) => console.log('Time updated:', time)}
            autoStart
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timer without Controls</Text>
          <Text>잠시 기능 꺼둠</Text>
          {/* <ExerciseTimer
            onTimeUpdate={(time) => console.log('Time updated:', time)}
            showControls={false}
            autoStart
          /> */}
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