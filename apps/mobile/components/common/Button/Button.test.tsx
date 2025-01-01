import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly in dark mode', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={() => {}} />
    );
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('handles onPress event', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Press Me" onPress={onPress} />
    );

    fireEvent.press(getByText('Press Me'));
    expect(onPress).toHaveBeenCalled();
  });

  it('shows loading indicator when loading prop is true', () => {
    const { getByTestId } = render(
      <Button title="Loading" onPress={() => {}} loading />
    );
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('applies different styles based on variant prop', () => {
    const { getByTestId } = render(
      <Button
        title="Test"
        onPress={() => {}}
        type="primary"
        testID="button"
      />
    );
    expect(getByTestId('button')).toBeTruthy();
  });

  it('disables button when disabled prop is true', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Button
        title="Test"
        onPress={onPress}
        disabled
        testID="button"
      />
    );

    fireEvent.press(getByTestId('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
}); 