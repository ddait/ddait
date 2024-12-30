import React, { useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { createStyles } from './styles';
import { MatchHistoryProps, IDateRange, IMatchResult } from './types';
import { DateRangeFilter } from './DateRangeFilter';
import { MatchHistoryCard } from './MatchHistoryCard';

export function MatchHistory({ matches, onMatchPress, isLoading }: MatchHistoryProps) {
  const styles = createStyles();
  const [dateRange, setDateRange] = useState<IDateRange>({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1주일 전
    endDate: new Date(),
  });

  const handleRangeChange = useCallback((newRange: IDateRange) => {
    setDateRange(newRange);
    // TODO: API 호출하여 새로운 범위의 매치 데이터 가져오기
  }, []);

  const renderItem = useCallback(({ item }: { item: IMatchResult }) => (
    <MatchHistoryCard
      match={item}
      onPress={() => onMatchPress?.(item.id)}
    />
  ), [onMatchPress]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!matches.length) {
    return (
      <View style={styles.container}>
        <DateRangeFilter
          range={dateRange}
          onRangeChange={handleRangeChange}
        />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            선택한 기간에 진행한 매치가 없습니다
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DateRangeFilter
        range={dateRange}
        onRangeChange={handleRangeChange}
      />
      <FlatList
        data={matches}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={listStyles.content}
        showsVerticalScrollIndicator={false}
        testID="match-history-list"
      />
    </View>
  );
}

const listStyles = StyleSheet.create({
  content: {
    paddingVertical: 8,
  },
}); 