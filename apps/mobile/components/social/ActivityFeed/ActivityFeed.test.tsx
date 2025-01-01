import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ActivityFeed from './ActivityFeed';
import { IActivity } from './types';

describe('ActivityFeed', () => {
  it('renders loading state initially', () => {
    render(<ActivityFeed />);
    expect(screen.getByTestId('activity-feed-loading')).toBeTruthy();
  });

  it('renders empty state when no activities', () => {
    render(<ActivityFeed activities={[]} />);
    expect(screen.getByTestId('activity-feed-empty')).toBeTruthy();
  });

  it('renders activity items when data is provided', () => {
    const mockActivities: IActivity[] = [
      {
        id: '1',
        userId: 'user1',
        type: 'exercise',
        content: 'Completed a workout',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        userId: 'user2',
        type: 'competition',
        content: 'Won a competition',
        timestamp: new Date().toISOString(),
      },
    ];

    render(<ActivityFeed activities={mockActivities} />);
    expect(screen.getAllByTestId('activity-item')).toHaveLength(2);
  });

  it('handles refresh action', () => {
    const onRefresh = jest.fn();
    render(<ActivityFeed onRefresh={onRefresh} />);
    
    const flatList = screen.getByTestId('activity-feed-list');
    fireEvent.scroll(flatList, {
      nativeEvent: {
        contentOffset: { y: -100 },
        contentSize: { height: 500, width: 100 },
        layoutMeasurement: { height: 100, width: 100 }
      }
    });
    
    expect(onRefresh).toHaveBeenCalled();
  });
}); 