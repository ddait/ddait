import { useCallback, useEffect, useRef } from 'react';
import { IPost, FeedFilter, FeedSortType, ICreatePostDTO, ICreateCommentDTO } from '@/components/social/Feed/types';
import FeedService from '@/services/social/FeedService';
import { Share } from 'react-native';
import { useFeedStore } from '@/stores/feedStore';

export function useFeed(initialFilter: FeedFilter = 'all', initialSort: FeedSortType = 'latest') {
  const feedService = useRef(FeedService.getInstance());
  const {
    posts,
    filter,
    sortType,
    currentPage,
    hasMore,
    isLoading,
    error,
    setPosts,
    addPosts,
    updatePost,
    removePost,
    setFilter,
    setSortType,
    setCurrentPage,
    setHasMore,
    setLoading,
    setError,
  } = useFeedStore();

  const fetchPosts = useCallback(async (refresh = false) => {
    try {
      setError(null);
      if (refresh) {
        setLoading(true);
        setCurrentPage(1);
      } else {
        setLoading(true);
      }

      const response = await feedService.current.getFeedPosts(
        refresh ? 1 : currentPage,
        filter,
        sortType
      );

      if (refresh) {
        setPosts(response.posts);
      } else {
        addPosts(response.posts);
      }
      setHasMore(response.pagination.hasMore);
      
      if (!refresh) {
        setCurrentPage(currentPage + 1);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filter, sortType, setPosts, addPosts, setCurrentPage, setHasMore, setLoading, setError]);

  useEffect(() => {
    fetchPosts(true);
  }, [fetchPosts, filter, sortType]);

  const refresh = useCallback(() => {
    return fetchPosts(true);
  }, [fetchPosts]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchPosts();
    }
  }, [fetchPosts, isLoading, hasMore]);

  const createPost = useCallback(async (postData: ICreatePostDTO) => {
    try {
      const newPost = await feedService.current.createPost(postData);
      setPosts([newPost, ...posts]);
      return newPost;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [posts, setPosts, setError]);

  const deletePost = useCallback(async (postId: string) => {
    try {
      await feedService.current.deletePost(postId);
      removePost(postId);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [removePost, setError]);

  const sharePost = useCallback(async (post: IPost) => {
    try {
      const shareContent = {
        title: `${post.user.username}님의 운동`,
        message: `${post.content}\n\n${post.user.username}님의 운동 스토리를 확인해보세요!`,
        url: post.images?.[0],
      };

      const result = await Share.share(shareContent);
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared via ${result.activityType}`);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [setError]);

  const likePost = useCallback(async (postId: string) => {
    try {
      await feedService.current.likePost(postId);
      const post = posts.find(p => p.id === postId);
      if (post) {
        updatePost(postId, { isLiked: true, likes: post.likes + 1 });
      }
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [posts, updatePost, setError]);

  const unlikePost = useCallback(async (postId: string) => {
    try {
      await feedService.current.unlikePost(postId);
      const post = posts.find(p => p.id === postId);
      if (post) {
        updatePost(postId, { isLiked: false, likes: post.likes - 1 });
      }
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [posts, updatePost, setError]);

  const addComment = useCallback(async (commentData: ICreateCommentDTO) => {
    try {
      const newComment = await feedService.current.addComment(commentData);
      const post = posts.find(p => p.id === commentData.postId);
      if (post) {
        updatePost(commentData.postId, { comments: post.comments + 1 });
      }
      return newComment;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [posts, updatePost, setError]);

  const updateFilter = useCallback((newFilter: FeedFilter) => {
    setFilter(newFilter);
  }, [setFilter]);

  const updateSort = useCallback((newSort: FeedSortType) => {
    setSortType(newSort);
  }, [setSortType]);

  return {
    posts,
    isLoading,
    hasMore,
    error,
    filter,
    sortType,
    refresh,
    loadMore,
    createPost,
    deletePost,
    likePost,
    unlikePost,
    addComment,
    sharePost,
    updateFilter,
    updateSort,
  };
} 