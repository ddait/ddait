import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { createStyles } from './styles';
import { LeaderBoardHeaderProps, LeaderBoardPeriod } from './types';

export function LeaderBoardHeader({ period, onPeriodChange }: LeaderBoardHeaderProps) {
  const styles = createStyles();

  const renderPeriodButton = (buttonPeriod: LeaderBoardPeriod, label: string) => {
    const isActive = period === buttonPeriod;
    return (
      <TouchableOpacity
        onPress={() => onPeriodChange(buttonPeriod)}
        style={[
          styles.periodButton,
          isActive && styles.periodButtonActive,
        ]}
      >
        <Text
          style={[
            styles.periodButtonText,
            isActive && styles.periodButtonTextActive,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View style={styles.header}>
      {renderPeriodButton('weekly', '주간')}
      {renderPeriodButton('monthly', '월간')}
    </Animated.View>
  );
} 