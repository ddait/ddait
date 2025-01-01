import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { WorkoutTypeSelector } from './WorkoutTypeSelector';
import { IWorkoutType } from './types';

const mockWorkoutTypes: IWorkoutType[] = [
  {
    id: '1',
    name: 'Running',
    icon: '🏃‍♂️',
    category: 'cardio',
    description: 'Cardio exercise'
  },
  {
    id: '2',
    name: 'Weight Lifting',
    icon: '🏋️‍♂️',
    category: 'strength',
    description: 'Strength training'
  }
];

describe('WorkoutTypeSelector', () => {
  it('renders correctly with initial state', () => {
    const onSelect = jest.fn();
    const { getByText, getByTestId } = render(
      <WorkoutTypeSelector
        onSelect={onSelect}
      />
    );

    // 컴포넌트가 렌더링되었는지 확인
    expect(getByTestId('workout-type-selector')).toBeTruthy();
    
    // 기본 카테고리들이 표시되는지 확인
    expect(getByText('Cardio')).toBeTruthy();
    expect(getByText('Strength')).toBeTruthy();
    expect(getByText('Flexibility')).toBeTruthy();
    expect(getByText('Sports')).toBeTruthy();
  });

  it('calls onSelect when a workout type is selected', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <WorkoutTypeSelector
        onSelect={onSelect}
      />
    );

    // 운동 유형 선택
    fireEvent.press(getByText('Running'));
    
    // onSelect가 올바른 값으로 호출되었는지 확인
    expect(onSelect).toHaveBeenCalledWith('1');
  });

  it('filters workout types by category', () => {
    const onSelect = jest.fn();
    const { getByText, queryByText } = render(
      <WorkoutTypeSelector
        onSelect={onSelect}
      />
    );

    // Cardio 카테고리 선택
    fireEvent.press(getByText('Cardio'));
    
    // Cardio 카테고리의 운동만 표시되는지 확인
    expect(getByText('Running')).toBeTruthy();
    expect(queryByText('Weight Lifting')).toBeNull();
  });

  it('disables interaction when disabled prop is true', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <WorkoutTypeSelector
        onSelect={onSelect}
        disabled={true}
      />
    );

    // 비활성화 상태에서 선택 시도
    fireEvent.press(getByText('Running'));
    
    // onSelect가 호출되지 않아야 함
    expect(onSelect).not.toHaveBeenCalled();
  });
}); 