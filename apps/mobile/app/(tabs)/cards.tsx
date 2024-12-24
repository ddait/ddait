import React from 'react';
import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/common/Card/Card';
import { colors } from '../../theme/colors';

export default function CardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
}); 