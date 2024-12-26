import React, { useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Button } from '@/components/common/Button/Button';
import { ProgressBar } from '@/components/common/ProgressBar';
import { useCompetitionSessionStore } from '@/stores/competitionSessionStore';
import { useCompetitionTimer } from '@/hooks/useCompetitionTimer';
import { useScoreCalculator } from '@/hooks/useScoreCalculator';
import { styles } from './CompetitionSession.styles';
import type { CompetitionSessionProps } from './types';

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function CompetitionSession({
  opponent,
  onComplete,
  onGiveUp,
}: CompetitionSessionProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const {
    status,
    myScore,
    opponentScore,
    startSession,
    updateMyScore,
    updateProgress: updateSessionProgress,
    giveUp: handleGiveUp,
    reset,
  } = useCompetitionSessionStore();

  const { remainingTime, isRunning, start: startTimer } = useCompetitionTimer({
    onComplete,
  });

  const { score, progress, updateProgress } = useScoreCalculator({
    onScoreUpdate: updateMyScore,
  });

  const handleStart = useCallback(() => {
    startSession();
    startTimer();
  }, [startSession, startTimer]);

  const handleProgressUpdate = useCallback((newProgress: number) => {
    updateProgress(newProgress);
    updateSessionProgress(newProgress);
  }, [updateProgress, updateSessionProgress]);

  const handleGiveUpPress = useCallback(() => {
    handleGiveUp();
    onGiveUp();
  }, [handleGiveUp, onGiveUp]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  useEffect(() => {
    if (remainingTime === 0) {
      handleGiveUp();
    }
  }, [remainingTime, handleGiveUp]);

  const currentOpponentScore = opponentScore ?? opponent.currentScore;
  const isComplete = status === 'completed';
  const isWinner = isComplete && myScore > currentOpponentScore;

  return (
    <View testID="competition-session" style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text testID="timer" style={[styles.timer, { color: colors.text }]}>
          {formatTime(remainingTime)}
        </Text>
      </View>

      <View testID="score-board" style={[styles.scoreBoard, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.playerInfo}>
          <Text style={[styles.playerName, { color: colors.text }]}>나</Text>
          <Text style={[styles.score, { color: colors.text }]}>{myScore}</Text>
        </View>

        <Text style={[styles.vsText, { color: colors.text }]}>VS</Text>

        <View style={styles.playerInfo}>
          <Text style={[styles.playerName, { color: colors.text }]}>{opponent.name}</Text>
          <Text style={[styles.playerLevel, { color: colors.text }]}>Lv.{opponent.level}</Text>
          <Text style={[styles.score, { color: colors.text }]}>{currentOpponentScore}</Text>
        </View>
      </View>

      <View testID="progress-container" style={styles.progressContainer}>
        <ProgressBar 
          testID="progress-bar" 
          progress={progress}
          onProgressUpdate={handleProgressUpdate}
        />
      </View>

      {status === 'ready' && (
        <Button
          testID="ready-button"
          onPress={handleStart}
          title="시작하기"
          type="primary"
        />
      )}

      {status === 'in_progress' && (
        <View style={styles.buttonContainer}>
          <Button
            testID="give-up-button"
            onPress={handleGiveUpPress}
            title="포기하기"
            type="secondary"
          />
        </View>
      )}

      {isComplete && (
        <View testID="result-display" style={styles.resultDisplay}>
          <Text style={styles.resultText}>
            {isWinner ? '승리!' : '패배...'}
          </Text>
        </View>
      )}
    </View>
  );
} 