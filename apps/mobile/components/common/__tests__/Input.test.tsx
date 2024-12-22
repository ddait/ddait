import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../Input';
import '@testing-library/jest-native/extend-expect';

describe('Input', () => {
  it('renders correctly with default props', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" />
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('handles text input correctly', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Enter text"
        onChangeText={onChangeText}
      />
    );

    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'Hello');
    expect(onChangeText).toHaveBeenCalledWith('Hello');
  });

  it('shows error state correctly', () => {
    const { getByTestId } = render(
      <Input
        placeholder="Enter text"
        error="This field is required"
      />
    );
    
    const inputContainer = getByTestId('input-container');
    const errorMessage = getByTestId('input-error');
    
    expect(errorMessage).toHaveTextContent('This field is required');
    expect(inputContainer).toHaveStyle({ borderColor: '#FF4444' });
  });

  it('handles disabled state correctly', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Enter text"
        onChangeText={onChangeText}
        disabled
      />
    );

    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'Hello');
    expect(onChangeText).not.toHaveBeenCalled();
  });

  it('applies custom styles correctly', () => {
    const { getByTestId } = render(
      <Input
        placeholder="Enter text"
        style={{ backgroundColor: '#F0F0F0' }}
        containerStyle={{ padding: 10 }}
      />
    );

    const input = getByTestId('input');
    const container = getByTestId('input-container');
    
    expect(input).toHaveStyle({ backgroundColor: '#F0F0F0' });
    expect(container).toHaveStyle({ padding: 10 });
  });

  it('handles secure text entry correctly', () => {
    const { getByTestId } = render(
      <Input
        placeholder="Enter password"
        secureTextEntry
      />
    );

    const input = getByTestId('input');
    expect(input.props.secureTextEntry).toBe(true);
  });
}); 