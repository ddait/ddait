import React from 'react';
import { View, SectionList } from 'react-native';
import { CompetitionTypeSelector } from '@/components/competition/CompetitionTypeSelector';
import { ActiveMatches } from '@/components/competition/ActiveMatches';
import { LeaderBoard } from '@/components/competition/LeaderBoard';
import { MatchHistory } from '@/components/competition/MatchHistory';
import { useRouter } from 'expo-router';
import { IActiveMatch } from '@/components/competition/ActiveMatches/types';
import { ILeaderBoardUser } from '@/components/competition/LeaderBoard/types';
import { IMatchResult } from '@/components/competition/MatchHistory/types';

// Mock data for active matches
const mockActiveMatches: IActiveMatch[] = [
  {
    id: '1',
    type: 'oneOnOne',
    participants: [
      { id: 'user1', name: '홍길동', score: 120 },
      { id: 'user2', name: '김철수', score: 100 },
    ],
    startTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 45).toISOString(),
    status: 'inProgress',
  },
  {
    id: '2',
    type: 'group',
    participants: [
      { id: 'user3', name: '이영희', score: 80 },
      { id: 'user4', name: '박지성', score: 90 },
    ],
    startTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
    status: 'inProgress',
  },
];

// Mock data for leaderboard
const mockLeaderboardData: ILeaderBoardUser[] = [
  {
    id: '1',
    name: '홍길동',
    score: 1200,
    rank: 1,
    trend: 'up',
    isCurrentUser: true,
    previousRank: 2,
  },
  {
    id: '2',
    name: '김철수',
    score: 1100,
    rank: 2,
    trend: 'down',
    isCurrentUser: false,
    previousRank: 1,
  },
];

// Mock data for match history
const mockMatchHistory: IMatchResult[] = [
  {
    id: '1',
    type: 'oneOnOne',
    date: new Date().toISOString(),
    duration: 30,
    participants: [
      { id: 'user1', name: '홍길동', score: 100, rank: 1 },
      { id: 'user2', name: '김철수', score: 80, rank: 2 },
    ],
    status: 'win',
    exerciseType: '달리기',
    stats: {
      totalCalories: 300,
      avgHeartRate: 150,
      distance: 5.0,
      pace: 6.5,
    },
  },
  {
    id: '2',
    type: 'group',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    duration: 45,
    participants: [
      { id: 'user1', name: '홍길동', score: 90, rank: 2 },
      { id: 'user2', name: '김영희', score: 95, rank: 1 },
    ],
    status: 'lose',
    exerciseType: '자전거',
    stats: {
      totalCalories: 450,
      avgHeartRate: 140,
      distance: 15.0,
      pace: 5.5,
    },
  },
];

export default function CompetitionScreen() {
  const router = useRouter();

  const sections = [
    {
      title: 'competition-types',
      data: [{ type: 'competition-types' }],
      renderItem: () => (
        <CompetitionTypeSelector
          onSelect={(type) => {
            router.push('/(tabs)/competition/matching' as any);
          }}
        />
      ),
    },
    {
      title: 'active-matches',
      data: [{ type: 'active-matches' }],
      renderItem: () => (
        <ActiveMatches
          matches={mockActiveMatches}
          onMatchPress={(id) => {
            router.push('/(tabs)/competition/match' as any);
          }}
        />
      ),
    },
    {
      title: 'leaderboard',
      data: [{ type: 'leaderboard' }],
      renderItem: () => (
        <LeaderBoard
          users={mockLeaderboardData}
          period="weekly"
          onPeriodChange={() => {}}
        />
      ),
    },
    {
      title: 'match-history',
      data: [{ type: 'match-history' }],
      renderItem: () => (
        <MatchHistory
          matches={mockMatchHistory}
          onMatchPress={(id) => {
            router.push('/(tabs)/competition/match' as any);
          }}
        />
      ),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.type + index}
        renderItem={({ section }) => section.renderItem()}
        renderSectionHeader={() => null}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
} 