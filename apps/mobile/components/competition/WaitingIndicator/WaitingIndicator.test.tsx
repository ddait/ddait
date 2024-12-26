import React from 'react';
import { render } from '@testing-library/react-native';
import { WaitingIndicator } from '../WaitingIndicator/WaitingIndicator';

describe('WaitingIndicator', () => {
  it('renders correctly with default props', () => {
    const { getByTestId, getByText } = render(<WaitingIndicator />);
    
    expect(getByTestId('waiting-indicator')).toBeTruthy();
    expect(getByText('매칭 중...')).toBeTruthy();
  });

  it('renders custom message when provided', () => {
    const customMessage = '상대방을 찾고 있습니다...';
    const { getByText } = render(<WaitingIndicator message={customMessage} />);
    
    expect(getByText(customMessage)).toBeTruthy();
  });

  it('renders dots animation', () => {
    const { getByTestId } = render(<WaitingIndicator />);
    
    expect(getByTestId('dots-animation')).toBeTruthy();
  });

  it('applies custom styles when provided', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(<WaitingIndicator style={customStyle} />);
    
    const indicator = getByTestId('waiting-indicator');
    expect(indicator.props.style).toContainEqual(customStyle);
  });
}); 