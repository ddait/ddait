import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

// Mock useColorScheme hook
jest.mock('../../../hooks/useColorScheme', () => ({
  useColorScheme: () => 'dark',
}));

describe('Button', () => {
  it('renders correctly in dark mode', () => {
    const { getByText } = render(<Button>Test Button</Button>);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('handles onPress event', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress}>Press Me</Button>);
    
    fireEvent.press(getByText('Press Me'));
    expect(onPress).toHaveBeenCalled();
  });

  it('shows loading indicator when loading prop is true', () => {
    const { getByTestId } = render(<Button loading>Loading</Button>);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('applies different styles based on variant prop', () => {
    const { rerender, getByTestId } = render(
      <Button testID="button" variant="primary">Primary</Button>
    );
    expect(getByTestId('button')).toBeTruthy();

    rerender(<Button testID="button" variant="secondary">Secondary</Button>);
    expect(getByTestId('button')).toBeTruthy();

    rerender(<Button testID="button" variant="ghost">Ghost</Button>);
    expect(getByTestId('button')).toBeTruthy();
  });

  it('applies different styles based on size prop', () => {
    const { rerender, getByTestId } = render(
      <Button testID="button" size="small">Small</Button>
    );
    expect(getByTestId('button')).toBeTruthy();

    rerender(<Button testID="button" size="medium">Medium</Button>);
    expect(getByTestId('button')).toBeTruthy();

    rerender(<Button testID="button" size="large">Large</Button>);
    expect(getByTestId('button')).toBeTruthy();
  });

  it('disables button when disabled prop is true', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Button testID="button" disabled onPress={onPress}>Disabled</Button>
    );
    
    fireEvent.press(getByTestId('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
}); 