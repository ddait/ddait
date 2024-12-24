import React from 'react';
import { render, act } from '@testing-library/react-native';
import { ProgressBar } from '../ProgressBar/ProgressBar';

jest.useFakeTimers();

// Helper function to find style property in style array
function findStyleProperty(styleArray: any[], property: string) {
  return styleArray.find(style => style && style[property] !== undefined)?.[property];
}

describe('ProgressBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    const { getByTestId } = render(<ProgressBar />);
    expect(getByTestId('progress-bar')).toBeTruthy();
  });

  it('renders with specific value', async () => {
    const { getByTestId } = render(<ProgressBar value={50} animated={false} />);
    const progressFill = getByTestId('progress-bar-fill');
    const style = progressFill.props.style;
    
    expect(style).toEqual(
      expect.objectContaining({
        backgroundColor: expect.any(String),
        height: '100%',
        borderRadius: 999
      })
    );
  });

  it('renders with different sizes', () => {
    const { getByTestId, rerender } = render(<ProgressBar size="small" animated={false} />);
    const progressBar = getByTestId('progress-bar');
    
    const smallHeight = findStyleProperty(progressBar.props.style, 'height');
    expect(smallHeight).toBe(2);

    rerender(<ProgressBar size="large" animated={false} />);
    const largeHeight = findStyleProperty(progressBar.props.style, 'height');
    expect(largeHeight).toBe(8);
  });

  it('renders with custom colors', () => {
    const { getByTestId } = render(
      <ProgressBar 
        value={50}
        animated={false}
        color="#ff0000"
        trackColor="#cccccc"
      />
    );
    
    const progressBar = getByTestId('progress-bar');
    const progressFill = getByTestId('progress-bar-fill');

    const trackBgColor = findStyleProperty(progressBar.props.style, 'backgroundColor');
    expect(trackBgColor).toBe('#cccccc');
    
    const fillBgColor = progressFill.props.style.backgroundColor;
    expect(fillBgColor).toBe('#ff0000');
  });

  it('renders in indeterminate state', async () => {
    const { getByTestId } = render(<ProgressBar variant="indeterminate" />);
    const progressFill = getByTestId('progress-bar-fill');

    // Run only one animation cycle
    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    expect(progressFill.props.style.width).toBeDefined();
  });

  it('handles animation correctly', async () => {
    const { getByTestId } = render(<ProgressBar value={50} />);
    const progressFill = getByTestId('progress-bar-fill');

    // Run a single animation frame
    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    expect(progressFill.props.style.width).toBeDefined();
  });

  it('applies custom styles', () => {
    const customStyle = { marginTop: 10 };
    const { getByTestId } = render(
      <ProgressBar style={customStyle} animated={false} />
    );
    
    const progressBar = getByTestId('progress-bar');
    const marginTop = findStyleProperty(progressBar.props.style, 'marginTop');
    expect(marginTop).toBe(10);
  });

  it('handles accessibility props correctly', () => {
    const { getByTestId } = render(
      <ProgressBar value={50} label="Loading progress" animated={false} />
    );
    
    const progressBar = getByTestId('progress-bar');
    expect(progressBar.props.accessibilityRole).toBe('progressbar');
    expect(progressBar.props.accessibilityLabel).toBe('Loading progress');
    expect(progressBar.props.accessibilityValue).toEqual({
      now: 50,
      min: 0,
      max: 100
    });
  });
}); 