import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CompetitionTypeSelector } from './CompetitionTypeSelector';
import { CompetitionType } from './types';

// Mock FontAwesome component
jest.mock('@expo/vector-icons', () => ({
  FontAwesome: 'FontAwesome',
}));

describe('CompetitionTypeSelector', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('renders all competition types', () => {
    const { getByText, getByTestId } = render(
      <CompetitionTypeSelector onSelect={mockOnSelect} />
    );

    // 컴포넌트가 렌더링되었는지 확인
    expect(getByTestId('competition-type-selector')).toBeTruthy();
    
    // 모든 경쟁 유형이 표시되는지 확인
    expect(getByText('1:1 대결')).toBeTruthy();
    expect(getByText('과거 기록과 대결')).toBeTruthy();
    expect(getByText('친구 대결')).toBeTruthy();
  });

  it('calls onSelect with correct type when a competition type is selected', () => {
    const { getByText } = render(
      <CompetitionTypeSelector onSelect={mockOnSelect} />
    );

    // 1:1 대결 선택
    fireEvent.press(getByText('1:1 대결'));
    expect(mockOnSelect).toHaveBeenCalledWith('oneOnOne');

    // 과거 기록과 대결 선택
    fireEvent.press(getByText('과거 기록과 대결'));
    expect(mockOnSelect).toHaveBeenCalledWith('history');

    // 친구 대결 선택
    fireEvent.press(getByText('친구 대결'));
    expect(mockOnSelect).toHaveBeenCalledWith('friend');
  });

  it('renders icons for each competition type', () => {
    const { getAllByRole } = render(
      <CompetitionTypeSelector onSelect={mockOnSelect} />
    );
    
    // 각 타입별 버튼이 있는지 확인
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  it('disables interaction when disabled prop is true', () => {
    const { getByText } = render(
      <CompetitionTypeSelector onSelect={mockOnSelect} disabled />
    );

    fireEvent.press(getByText('1:1 대결'));
    expect(mockOnSelect).not.toHaveBeenCalled();
  });
}); 