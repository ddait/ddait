import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProgressBar } from '../../components/common/ProgressBar/ProgressBar';
import { colors } from '../../theme/colors';

export default function ProgressScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
  progressGroup: {
    gap: 16,
  },
}); 