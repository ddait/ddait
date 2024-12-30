export interface IActivity {
  id: string;
  userId: string;
  type: 'exercise' | 'competition' | 'social';
  content: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface IActivityFeedProps {
  activities?: IActivity[];
  isLoading?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
} 