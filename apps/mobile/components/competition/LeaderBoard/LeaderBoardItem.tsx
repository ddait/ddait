import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createStyles } from './styles';
import { LeaderBoardItemProps } from './types';

export function LeaderBoardItem({ user, onPress }: LeaderBoardItemProps) {
  const styles = createStyles();

  const renderTrendIcon = () => {
    const iconName = user.trend === 'up' ? 'arrow-up' : user.trend === 'down' ? 'arrow-down' : 'minus';
    const trendStyle = user.trend === 'up' ? styles.trendUp : user.trend === 'down' ? styles.trendDown : styles.trendSame;

    return (
      <View style={styles.trend}>
        <FontAwesome 
          name={iconName} 
          style={[styles.trendIcon, trendStyle]} 
        />
        <Text style={[styles.score, trendStyle]}>
          {Math.abs(user.previousRank - user.rank)}
        </Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.itemContainer,
        user.isCurrentUser && styles.itemContainerHighlighted,
      ]}
      testID={`leaderboard-item-${user.id}`}
    >
      <Text style={styles.rank}>
        {user.rank}
      </Text>
      {user.avatar ? (
        <Image
          source={{ uri: user.avatar }}
          style={styles.avatar}
        />
      ) : (
        <View style={styles.avatar} />
      )}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {user.name}
        </Text>
        <Text style={styles.score}>
          {user.score.toLocaleString()} 점
        </Text>
      </View>
      {renderTrendIcon()}
    </TouchableOpacity>
  );
} 