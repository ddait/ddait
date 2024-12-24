import React from 'react';
import { View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ExerciseCard } from '../ExerciseCard';
import type { ActiveExerciseCardProps, PausedExerciseCardProps, CompletedExerciseCardProps } from '../types';

// Mock the entire @expo/vector-icons module
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

// Mock IconSymbol component
jest.mock('../../../ui/IconSymbol', () => ({
  IconSymbol: 'mockIconSymbol',
}));

// Mock ProgressBar component
jest.mock('../../../common/ProgressBar/ProgressBar', () => ({
  ProgressBar: 'mockProgressBar',
}));

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
  },
}));

describe('ExerciseCard', () => {
  const mockPause = jest.fn();
  const mockResume = jest.fn();
  const mockStop = jest.fn();

  const defaultProps: ActiveExerciseCardProps = {
    title: 'Morning Run',
    type: 'running',
    duration: 1800, // 30 minutes
    calories: 250,
    status: 'active',
    onPause: mockPause,
    onStop: mockStop,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with required props', () => {
    const { getByText, getByTestId } = render(
      <ExerciseCard {...defaultProps} />
    );

    expect(getByText('Morning Run')).toBeTruthy();
    expect(getByTestId('exercise-card')).toBeTruthy();
  });

  it('displays correct status indicator', () => {
    const { rerender, getByTestId } = render(
      <ExerciseCard {...defaultProps} />
    );
    expect(getByTestId('status-indicator')).toHaveStyle({
      backgroundColor: expect.any(String),
    });

    const pausedProps: PausedExerciseCardProps = {
      ...defaultProps,
      status: 'paused',
      onResume: mockResume,
      onStop: mockStop,
    };
    rerender(<ExerciseCard {...pausedProps} />);
    expect(getByTestId('status-indicator')).toHaveStyle({
      backgroundColor: expect.any(String),
    });

    const completedProps: CompletedExerciseCardProps = {
      ...defaultProps,
      status: 'completed',
    };
    rerender(<ExerciseCard {...completedProps} />);
    expect(getByTestId('status-indicator')).toHaveStyle({
      backgroundColor: expect.any(String),
    });
  });

  it('shows progress correctly', () => {
    const { getByTestId } = render(
      <ExerciseCard {...defaultProps} progress={75} />
    );
    
    const progressBar = getByTestId('progress-bar');
    expect(progressBar).toBeTruthy();
  });

  it('handles onPress event', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <ExerciseCard {...defaultProps} onPress={onPress} />
    );

    fireEvent.press(getByTestId('exercise-card'));
    expect(onPress).toHaveBeenCalled();
  });

  it('handles control button clicks', () => {
    const { getByTestId, rerender } = render(
      <ExerciseCard {...defaultProps} />
    );

    // Test pause button when active
    fireEvent.press(getByTestId('pause-button'));
    expect(mockPause).toHaveBeenCalled();

    // Test resume button when paused
    const pausedProps: PausedExerciseCardProps = {
      ...defaultProps,
      status: 'paused',
      onResume: mockResume,
      onStop: mockStop,
    };
    rerender(<ExerciseCard {...pausedProps} />);
    fireEvent.press(getByTestId('resume-button'));
    expect(mockResume).toHaveBeenCalled();

    // Test stop button
    fireEvent.press(getByTestId('stop-button'));
    expect(mockStop).toHaveBeenCalled();
  });

  it('applies variant styles correctly', () => {
    const { getByTestId, rerender } = render(
      <ExerciseCard {...defaultProps} variant="default" />
    );
    expect(getByTestId('exercise-card')).toHaveStyle({
      padding: expect.any(Number),
    });

    rerender(<ExerciseCard {...defaultProps} variant="compact" />);
    expect(getByTestId('exercise-card')).toHaveStyle({
      padding: expect.any(Number),
    });
  });

  it('supports custom styling', () => {
    const customStyle = { marginTop: 20 };
    const { getByTestId } = render(
      <ExerciseCard {...defaultProps} style={customStyle} />
    );
    
    expect(getByTestId('exercise-card')).toHaveStyle(customStyle);
  });
}); 