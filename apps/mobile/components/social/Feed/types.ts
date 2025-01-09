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

export interface IComment {
  id: string;
  user: IUser;
  content: string;
  createdAt: string;
  updatedAt?: string;
  postId: string;
}

export interface ICommentResponse {
  comments: IComment[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasMore: boolean;
  };
}

export interface ILike {
  id: string;
  user: IUser;
  postId: string;
  createdAt: string;
}

export interface IFeedState {
  posts: IPost[];
  filter: FeedFilter;
  sortType: FeedSortType;
  currentPage: number;
  hasMore: boolean;
  isLoading: boolean;
  error: Error | null;
}

export interface IFeedActions {
  setPosts: (posts: IPost[]) => void;
  addPosts: (posts: IPost[]) => void;
  setFilter: (filter: FeedFilter) => void;
  setSortType: (sortType: FeedSortType) => void;
  setCurrentPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

export interface ICreatePostDTO {
  content: string;
  images?: string[];
}

export interface IUpdatePostDTO {
  content?: string;
  images?: string[];
}

export interface ICreateCommentDTO {
  content: string;
  postId: string;
} 