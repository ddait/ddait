import { useState, useCallback, useEffect } from 'react';
import { IPost, FeedFilter, FeedSortType } from '@/components/social/Feed/types';

// TODO: API 연동 시 실제 데이터로 대체
const DUMMY_POSTS: IPost[] = [
  {
    id: '1',
    user: {
      id: 'user1',
      username: '김운동',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    content: '오늘도 열심히 운동했습니다! 💪',
    images: ['https://picsum.photos/400/300'],
    likes: 42,
    comments: 5,
    isLiked: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    user: {
      id: 'user2',
      username: '박헬스',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    content: '새로운 운동 루틴을 시작했어요. 같이 도전하실 분?',
    likes: 28,
    comments: 12,
    isLiked: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export function useFeed(initialFilter: FeedFilter = 'all', initialSort: FeedSortType = 'latest') {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState<FeedFilter>(initialFilter);
  const [sort, setSort] = useState<FeedSortType>(initialSort);

  const fetchPosts = useCallback(async (refresh = false) => {
    try {
      setError(null);
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      // TODO: API 연동
      // 임시로 더미 데이터 사용
      setPosts(prev => refresh ? DUMMY_POSTS : [...prev, ...DUMMY_POSTS]);
      setHasMore(false);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(true);
  }, [fetchPosts, filter, sort]);

  const refresh = useCallback(() => {
    return fetchPosts(true);
  }, [fetchPosts]);

  const loadMore = useCallback(() => {
    if (!isLoading && !isRefreshing && hasMore) {
      fetchPosts();
    }
  }, [fetchPosts, isLoading, isRefreshing, hasMore]);

  const updateFilter = useCallback((newFilter: FeedFilter) => {
    setFilter(newFilter);
  }, []);

  const updateSort = useCallback((newSort: FeedSortType) => {
    setSort(newSort);
  }, []);

  return {
    posts,
    isLoading,
    isRefreshing,
    hasMore,
    error,
    filter,
    sort,
    refresh,
    loadMore,
    updateFilter,
    updateSort,
  };
} 