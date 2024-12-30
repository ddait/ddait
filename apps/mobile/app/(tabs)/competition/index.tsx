import React, { useState, useCallback } from 'react';
import { View, StyleSheet, SectionList, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@hooks/useColorScheme';
import { Colors } from '../../../constants/Colors';
import { useMatchingStore } from '../../../stores/matchingStore';
import { ActiveMatches } from '../../../components/competition/ActiveMatches';
import { CompetitionTypeSelector } from '../../../components/competition/CompetitionTypeSelector';
import { LeaderBoard } from '../../../components/competition/LeaderBoard';
import { IActiveMatch } from '../../../components/competition/ActiveMatches/types';
import { ILeaderBoardUser, LeaderBoardPeriod } from '../../../components/competition/LeaderBoard/types';

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

// 임시 리더보드 데이터
const mockLeaderboardUsers: ILeaderBoardUser[] = [
  {
    id: '1',
    name: '홍길동',
    rank: 1,
    score: 1200,
    isCurrentUser: true,
    trend: 'up',
    previousRank: 2,
  },
  {
    id: '2',
    name: '김철수',
    rank: 2,
    score: 1150,
    isCurrentUser: false,
    trend: 'down',
    previousRank: 1,
  },
  {
    id: '3',
    name: '이영희',
    rank: 3,
    score: 1000,
    isCurrentUser: false,
    trend: 'same',
    previousRank: 3,
  },
  {
    id: '4',
    name: '박지성',
    rank: 4,
    score: 950,
    isCurrentUser: false,
    trend: 'up',
    previousRank: 6,
  },
  {
    id: '5',
    name: '손흥민',
    rank: 5,
    score: 900,
    isCurrentUser: false,
    trend: 'down',
    previousRank: 4,
  },
];

type SectionType = {
  title: string;
  data: Array<'header' | 'matching' | 'activeMatches' | 'leaderboard'>;
};

export default function CompetitionScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const { startMatching } = useMatchingStore();
  const [leaderboardPeriod, setLeaderboardPeriod] = useState<LeaderBoardPeriod>('weekly');

  const handleCompetitionTypeSelect = (type: string) => {
    startMatching();
    router.push('/competition/matching' as any);
  };

  const handleMatchPress = (matchId: string) => {
    router.push(`/competition/session/${matchId}` as any);
  };

  const sections: SectionType[] = [
    { title: '', data: ['header'] },
    { title: '새로운 매칭', data: ['matching'] },
    { title: '', data: ['activeMatches'] },
    { title: '리더보드', data: ['leaderboard'] },
  ];

  const renderHeader = useCallback(() => (
    <View style={styles.header}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>
        경쟁
      </Text>
      <Text style={[styles.subtitle, { color: Colors[theme].text }]}>
        다른 사용자와 함께 운동하며 경쟁해보세요
      </Text>
    </View>
  ), [theme]);

  const renderItem = useCallback(({ item }: { item: string }) => {
    switch (item) {
      case 'header':
        return renderHeader();
      case 'matching':
        return (
          <View style={styles.matchingSection}>
            <CompetitionTypeSelector onSelect={handleCompetitionTypeSelect} />
          </View>
        );
      case 'activeMatches':
        return (
          <View style={styles.activeMatchesSection}>
            <ActiveMatches 
              matches={mockMatches}
              onMatchPress={handleMatchPress}
            />
          </View>
        );
      case 'leaderboard':
        return (
          <View style={styles.leaderboardSection}>
            <LeaderBoard
              period={leaderboardPeriod}
              users={mockLeaderboardUsers}
              onPeriodChange={setLeaderboardPeriod}
            />
          </View>
        );
      default:
        return null;
    }
  }, [handleCompetitionTypeSelect, handleMatchPress, leaderboardPeriod, theme]);

  const renderSectionHeader = useCallback(({ section }: { section: SectionType }) => {
    if (!section.title) return null;
    return (
      <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
        {section.title}
      </Text>
    );
  }, [theme]);

  return (
    <SectionList
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
      contentContainerStyle={styles.contentContainer}
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={false}
      showsVerticalScrollIndicator={false}
    />
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
  activeMatchesSection: {
    marginBottom: 20,
  },
  leaderboardSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
}); 