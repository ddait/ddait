import { IUser } from '../Feed/types';

export type FollowStatus = 'none' | 'following' | 'followed' | 'mutual';

export interface IFollowRelation {
  followerId: string;
  followingId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IFollowUser extends IUser {
  followStatus: FollowStatus;
  followersCount: number;
  followingCount: number;
}

export interface IFollowResponse {
  users: IFollowUser[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasMore: boolean;
  };
}

export interface IFollowStats {
  followersCount: number;
  followingCount: number;
}

export interface IFollowFilter {
  query?: string;
  sortBy?: 'recent' | 'name';
  status?: FollowStatus;
}

export interface IFollowActionResponse {
  success: boolean;
  user: IFollowUser;
  message?: string;
}

export interface IFollowContextValue {
  followers: IFollowUser[];
  following: IFollowUser[];
  stats: IFollowStats;
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  filter: IFollowFilter;
  follow: (userId: string) => Promise<void>;
  unfollow: (userId: string) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  updateFilter: (newFilter: Partial<IFollowFilter>) => void;
} 