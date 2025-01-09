import React, { useState, useCallback } from 'react';
import { FlatList, View, ActivityIndicator, RefreshControl } from 'react-native';
import { useFeed } from '@/hooks/useFeed';
import FeedItem from './FeedItem';
import EmptyState from '../../../components/EmptyState';
import ErrorState from '../../../components/ErrorState';
import CommentModal from './CommentModal';
import { IPost, ICreateCommentDTO, IComment } from './types';

export default function FeedList() {
  const {
    posts,
    isLoading,
    hasMore,
    error,
    refresh,
    loadMore,
    likePost,
    unlikePost,
    addComment,
    getComments,
    deleteComment,
    sharePost,
  } = useFeed();

  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentsPage, setCommentsPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const handleCommentPress = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    setSelectedPost(post);
    setCommentsPage(1);
    setComments([]);
    setHasMoreComments(true);
    
    try {
      setIsLoadingComments(true);
      const response = await getComments(postId);
      setComments(response.comments);
      setHasMoreComments(response.pagination.hasMore);
    } catch (err) {
      // Error is already handled by useFeed
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleLoadMoreComments = async () => {
    if (!selectedPost || !hasMoreComments || isLoadingComments) return;

    try {
      setIsLoadingComments(true);
      const response = await getComments(selectedPost.id, commentsPage + 1);
      setComments(prev => [...prev, ...response.comments]);
      setCommentsPage(prev => prev + 1);
      setHasMoreComments(response.pagination.hasMore);
    } catch (err) {
      // Error is already handled by useFeed
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleAddComment = async (content: string) => {
    if (!selectedPost) return;

    const commentData: ICreateCommentDTO = {
      postId: selectedPost.id,
      content,
    };

    try {
      const newComment = await addComment(commentData);
      setComments(prev => [newComment, ...prev]);
    } catch (err) {
      // Error is already handled by useFeed
    }
  };

  const renderItem = ({ item }: { item: IPost }) => (
    <FeedItem
      post={item}
      onLike={item.isLiked ? unlikePost : likePost}
      onComment={handleCommentPress}
      onShare={() => sharePost(item)}
    />
  );

  const renderFooter = () => {
    if (!hasMore) return null;
    return (
      <View className="py-4">
        <ActivityIndicator size="small" />
      </View>
    );
  };

  if (error) {
    return <ErrorState error={error} onRetry={refresh} />;
  }

  if (!isLoading && posts.length === 0) {
    return <EmptyState message="게시물이 없습니다." />;
  }

  return (
    <>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refresh} />
        }
        className="flex-1 bg-background"
      />
      {selectedPost && (
        <CommentModal
          post={selectedPost}
          visible={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          onSubmit={handleAddComment}
          comments={comments}
          isLoading={isLoadingComments}
          onLoadMore={handleLoadMoreComments}
        />
      )}
    </>
  );
} 