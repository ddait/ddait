import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CompetitionTypeSelector } from './CompetitionTypeSelector';

describe('CompetitionTypeSelector', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('renders all competition types', () => {
    const { getByText } = render(
      <CompetitionTypeSelector onSelect={mockOnSelect} />
    );

    expect(getByText('1:1 대결')).toBeTruthy();
    expect(getByText('그룹 챌린지')).toBeTruthy();
    expect(getByText('랭킹전')).toBeTruthy();
    expect(getByText('과거 기록 도전')).toBeTruthy();
  });

  it('calls onSelect with correct type when pressed', () => {
    const { getByText } = render(
      <CompetitionTypeSelector onSelect={mockOnSelect} />
    );

    fireEvent.press(getByText('1:1 대결'));
    expect(mockOnSelect).toHaveBeenCalledWith('oneOnOne');

    fireEvent.press(getByText('그룹 챌린지'));
    expect(mockOnSelect).toHaveBeenCalledWith('group');

    fireEvent.press(getByText('랭킹전'));
    expect(mockOnSelect).toHaveBeenCalledWith('ranking');

    fireEvent.press(getByText('과거 기록 도전'));
    expect(mockOnSelect).toHaveBeenCalledWith('history');
  });

  it('applies selected styles when type is selected', () => {
    const { getByText, rerender } = render(
      <CompetitionTypeSelector onSelect={mockOnSelect} selectedType="oneOnOne" />
    );

    const oneOnOneCard = getByText('1:1 대결').parent?.parent;
    expect(oneOnOneCard?.props.style).toContainEqual(
      expect.objectContaining({ backgroundColor: expect.any(String) })
    );
  });

  it('disables interaction when disabled prop is true', () => {
    const { getByText } = render(
      <CompetitionTypeSelector onSelect={mockOnSelect} disabled />
    );

    fireEvent.press(getByText('1:1 대결'));
    expect(mockOnSelect).not.toHaveBeenCalled();
  });

  it('applies animation on press', () => {
    const { getByText } = render(
      <CompetitionTypeSelector onSelect={mockOnSelect} />
    );

    const button = getByText('1:1 대결').parent?.parent;
    expect(button?.props.style).toContainEqual(
      expect.objectContaining({
        transform: [{ scale: expect.any(Object) }],
      })
    );
  });
}); 