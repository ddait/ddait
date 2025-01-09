export type FeedFilter = 'all' | 'following';
export type FeedSortType = 'latest' | 'popular';

export interface IUser {
  id: string;
  username: string;
  avatar?: string;
  isFollowing?: boolean;
}

export interface IPost {
  id: string;
  user: IUser;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface IPostResponse {
  posts: IPost[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasMore: boolean;
  };
}

export interface IFeedListProps {
  posts: IPost[];
  isLoading: boolean;
  isRefreshing: boolean;
  hasMore: boolean;
  error: Error | null;
  onRefresh: () => void;
  onLoadMore: () => void;
}

export interface IFeedItemProps {
  post: IPost;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onUserPress?: (userId: string) => void;
} 