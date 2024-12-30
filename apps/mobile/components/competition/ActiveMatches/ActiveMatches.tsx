import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { createStyles } from './ActiveMatches.styles';
import { ActiveMatchesProps, IActiveMatch } from './types';

function ActiveMatchCard({ match, onPress }: { match: IActiveMatch; onPress?: () => void }) {
  const styles = createStyles();
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const totalTime = new Date(match.endTime).getTime() - new Date(match.startTime).getTime();
    const elapsed = Date.now() - new Date(match.startTime).getTime();
    const progress = Math.max(0, Math.min(1, elapsed / totalTime));

    Animated.spring(progressAnim, {
      toValue: progress,
      useNativeDriver: false,
    }).start();
  }, [match.startTime, match.endTime]);

  const getTimeRemaining = () => {
    const remaining = new Date(match.endTime).getTime() - Date.now();
    if (remaining <= 0) return '종료';
    const minutes = Math.floor(remaining / 60000);
    return `${minutes}분 남음`;
  };

  const getMatchTypeText = (type: IActiveMatch['type']) => {
    const types = {
      oneOnOne: '1:1 대결',
      group: '그룹 챌린지',
      ranking: '랭킹전',
      history: '기록 도전',
    };
    return types[type];
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
      testID="active-match-card"
    >
      <View style={styles.cardHeader}>
        <Text style={styles.matchType}>{getMatchTypeText(match.type)}</Text>
        <Text style={styles.timeRemaining}>{getTimeRemaining()}</Text>
      </View>
      <View style={styles.participants}>
        {match.participants.map((participant) => (
          <View key={participant.id} style={styles.participant}>
            <View style={styles.participantInfo}>
              {participant.avatar ? (
                <Image
                  source={{ uri: participant.avatar }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatar} />
              )}
              <Text style={styles.participantName}>{participant.name}</Text>
            </View>
            <Text style={styles.score}>{participant.score}</Text>
          </View>
        ))}
      </View>
      <View style={styles.progressBar}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}

export function ActiveMatches({ matches, onMatchPress, isLoading }: ActiveMatchesProps) {
  const styles = createStyles();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>진행중인 매치</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          {[1, 2].map((i) => (
            <View key={i} style={[styles.card, styles.skeletonCard]} />
          ))}
        </ScrollView>
      </View>
    );
  }

  if (!matches.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>진행중인 매치</Text>
        <Text style={styles.emptyText}>현재 진행중인 매치가 없습니다</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>진행중인 매치</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        testID="active-matches-scroll"
      >
        {matches.map((match) => (
          <ActiveMatchCard
            key={match.id}
            match={match}
            onPress={() => onMatchPress?.(match.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
} 