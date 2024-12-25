import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import WaitingIndicator from './WaitingIndicator';

describe('WaitingIndicator', () => {
  it('renders loading animation and initial status text', () => {
    const { getByTestId, getByText } = render(
      <WaitingIndicator onTimeout={() => {}} />
    );
    
    expect(getByTestId('waiting-spinner')).toBeTruthy();
    expect(getByText('매칭 상대를 찾는 중...')).toBeTruthy();
  });

  it('updates status text while waiting', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(
      <WaitingIndicator onTimeout={() => {}} />
    );
    
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    
    expect(getByTestId('waiting-status')).toBeTruthy();
    jest.useRealTimers();
  });

  it('calls onTimeout after specified duration', () => {
    jest.useFakeTimers();
    const onTimeout = jest.fn();
    render(<WaitingIndicator onTimeout={onTimeout} timeout={30000} />);
    
    act(() => {
      jest.advanceTimersByTime(30000);
    });
    
    expect(onTimeout).toHaveBeenCalled();
    jest.useRealTimers();
  });
}); 