/// <reference types="jest" />

import React from 'react';
import renderer from 'react-test-renderer';
import ThemedText from '../ThemedText';

describe('ThemedText', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ThemedText>Snapshot test!</ThemedText>).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <Text
        style={
          [
            {
              "fontSize": 16,
              "lineHeight": 24,
            },
            {
              "color": "#11181C",
            },
            undefined,
          ]
        }
      >
        Snapshot test!
      </Text>
    `);
  });
}); 