import { IUser } from '../Feed/types';

export type FollowStatus = 'none' | 'following' | 'followed' | 'mutual';

export type ActivityType = 'exercise' | 'achievement' | 'post';

export interface IUserProfile extends IUser {
  bio?: string;
  exercisePreferences?: string[];
  level?: number;
  lastActive?: string;
}

export interface IFollowRelationship {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
  updatedAt?: string;
  status: FollowStatus;
  notificationSettings: {
    posts: boolean;
    achievements: boolean;
    exercises: boolean;
  };
}

export interface IUserActivity {
  type: ActivityType;
  timestamp: string;
  summary: string;
  metadata?: {
    exerciseId?: string;
    achievementId?: string;
    postId?: string;
  };
}

export interface IEnhancedFollowUser extends IUserProfile {
  followStatus: FollowStatus;
  followersCount: number;
  followingCount: number;
  relationship?: IFollowRelationship;
  mutualFriends?: number;
  recentActivities?: IUserActivity[];
}

export interface IFollowStats {
  followersCount: number;
  followingCount: number;
  mutualCount?: number;
}

export interface IFollowFilter {
  query?: string;
  sortBy?: 'recent' | 'name' | 'mutual';
  status?: FollowStatus;
  exercisePreference?: string;
  level?: {
    min?: number;
    max?: number;
  };
  lastActive?: {
    from?: string;
    to?: string;
  };
}

export interface IFollowResponse {
  users: IEnhancedFollowUser[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasMore: boolean;
  };
}

export interface IFollowActionResponse {
  success: boolean;
  user: IEnhancedFollowUser;
  relationship: IFollowRelationship;
  message?: string;
}

export interface IFollowContextValue {
  followers: IEnhancedFollowUser[];
  following: IEnhancedFollowUser[];
  stats: IFollowStats;
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  filter: IFollowFilter;
  follow: (userId: string) => Promise<void>;
  unfollow: (userId: string) => Promise<void>;
  updateNotificationSettings: (userId: string, settings: Partial<IFollowRelationship['notificationSettings']>) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  updateFilter: (newFilter: Partial<IFollowFilter>) => void;
} 