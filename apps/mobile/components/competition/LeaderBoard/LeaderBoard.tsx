import React, { useCallback } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { createStyles } from './styles';
import { LeaderBoardProps, ILeaderBoardUser } from './types';
import { LeaderBoardHeader } from './LeaderBoardHeader';
import { LeaderBoardItem } from './LeaderBoardItem';

export function LeaderBoard({ 
  period, 
  users, 
  onPeriodChange,
  isLoading 
}: LeaderBoardProps) {
  const styles = createStyles();

  const renderItem = useCallback(({ item }: { item: ILeaderBoardUser }) => {
    return (
      <Animated.View entering={FadeInUp.delay(item.rank * 100)}>
        <LeaderBoardItem
          user={item}
          onPress={() => {
            // TODO: 사용자 프로필 보기 구현
          }}
        />
      </Animated.View>
    );
  }, []);

  const keyExtractor = useCallback((item: ILeaderBoardUser) => item.id, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LeaderBoardHeader
        period={period}
        onPeriodChange={onPeriodChange}
      />
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        testID="leaderboard-list"
      />
    </View>
  );
} 