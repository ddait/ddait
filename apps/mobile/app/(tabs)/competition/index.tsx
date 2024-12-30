import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@hooks/useColorScheme';
import { Colors } from '../../../constants/Colors';
import { useMatchingStore } from '../../../stores/matchingStore';
import { ActiveMatches } from '../../../components/competition/ActiveMatches';
import { CompetitionTypeSelector } from '../../../components/competition/CompetitionTypeSelector';
import { IActiveMatch } from '../../../components/competition/ActiveMatches/types';

// 임시 데이터
const mockMatches: IActiveMatch[] = [
  {
    id: '1',
    type: 'oneOnOne',
    participants: [
      { id: 'user1', name: '홍길동', score: 120 },
      { id: 'user2', name: '김철수', score: 95 },
    ],
    startTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 45).toISOString(),
    status: 'inProgress',
  },
  {
    id: '2',
    type: 'group',
    participants: [
      { id: 'user3', name: '이영희', score: 200 },
      { id: 'user4', name: '박지성', score: 180 },
      { id: 'user5', name: '손흥민', score: 220 },
    ],
    startTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
    status: 'inProgress',
  },
];

export default function CompetitionScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const { startMatching } = useMatchingStore();

  const handleCompetitionTypeSelect = (type: string) => {
    startMatching();
    router.push('/competition/matching' as any);
  };

  const handleMatchPress = (matchId: string) => {
    router.push(`/competition/session/${matchId}` as any);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors[theme].text }]}>
          경쟁
        </Text>
        <Text style={[styles.subtitle, { color: Colors[theme].text }]}>
          다른 사용자와 함께 운동하며 경쟁해보세요
        </Text>
      </View>

      <View style={styles.matchingSection}>
        <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
          새로운 매칭
        </Text>
        <CompetitionTypeSelector onSelect={handleCompetitionTypeSelect} />
      </View>

      <ActiveMatches 
        matches={mockMatches}
        onMatchPress={handleMatchPress}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  matchingSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
}); 