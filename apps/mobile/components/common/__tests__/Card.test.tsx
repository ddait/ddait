import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card } from '../Card/Card';
import type { CardVariant } from '../Card/Card';

describe('Card', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(
      <Card testID="test-card">
        <Text>Card Content</Text>
      </Card>
    );

    expect(getByTestId('test-card')).toBeTruthy();
  });

  it('renders with header and footer', () => {
    const { getByText } = render(
      <Card>
        <Card.Header>
          <Text>Header</Text>
        </Card.Header>
        <Card.Content>
          <Text>Content</Text>
        </Card.Content>
        <Card.Footer>
          <Text>Footer</Text>
        </Card.Footer>
      </Card>
    );

    expect(getByText('Header')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
    expect(getByText('Footer')).toBeTruthy();
  });

  it('handles onPress event', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Card testID="test-card" onPress={onPress}>
        <Text>Clickable Card</Text>
      </Card>
    );

    fireEvent.press(getByTestId('test-card'));
    expect(onPress).toHaveBeenCalled();
  });

  const variants: CardVariant[] = ['elevated', 'outlined', 'filled'];
  variants.forEach((variant) => {
    it(`renders ${variant} variant correctly`, () => {
      const { getByTestId } = render(
        <Card testID="test-card" variant={variant}>
          <Text>Card Content</Text>
        </Card>
      );

      expect(getByTestId('test-card')).toBeTruthy();
    });
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <Card testID="test-card" style={customStyle}>
        <Text>Styled Card</Text>
      </Card>
    );

    const card = getByTestId('test-card');
    expect(card.props.style).toEqual(expect.arrayContaining([expect.objectContaining(customStyle)]));
  });
}); 