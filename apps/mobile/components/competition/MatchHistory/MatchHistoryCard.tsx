import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { createStyles } from './styles';
import { MatchHistoryCardProps } from './types';

export function MatchHistoryCard({ match, onPress }: MatchHistoryCardProps) {
  const styles = createStyles();

  const getMatchTypeText = (type: string) => {
    const types = {
      oneOnOne: '1:1 대결',
      group: '그룹 챌린지',
      ranking: '랭킹전',
    };
    return types[type as keyof typeof types] || type;
  };

  const renderResultBadge = (status: string) => {
    const badgeStyle = {
      win: styles.resultBadgeWin,
      lose: styles.resultBadgeLose,
      draw: styles.resultBadgeDraw,
    };
    const statusText = {
      win: '승리',
      lose: '패배',
      draw: '무승부',
    };

    return (
      <View style={[styles.resultBadge, badgeStyle[status as keyof typeof badgeStyle]]}>
        <Text style={styles.resultText}>
          {statusText[status as keyof typeof statusText]}
        </Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      testID={`match-history-card-${match.id}`}
    >
      <View style={styles.cardHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.matchType}>
            {getMatchTypeText(match.type)}
          </Text>
          {renderResultBadge(match.status)}
        </View>
        <Text style={styles.dateTime}>
          {format(new Date(match.date), 'M.d (E) HH:mm', { locale: ko })}
        </Text>
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
              <Text style={styles.participantName}>
                {participant.name}
              </Text>
            </View>
            <Text style={styles.score}>
              {participant.score.toLocaleString()}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {match.stats.totalCalories}
          </Text>
          <Text style={styles.statLabel}>칼로리</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {match.stats.avgHeartRate}
          </Text>
          <Text style={styles.statLabel}>평균 심박수</Text>
        </View>
        {match.stats.distance && (
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {match.stats.distance.toFixed(1)}km
            </Text>
            <Text style={styles.statLabel}>거리</Text>
          </View>
        )}
        {match.stats.pace && (
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {Math.floor(match.stats.pace)}′{Math.round((match.stats.pace % 1) * 60)}″
            </Text>
            <Text style={styles.statLabel}>페이스</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
} 