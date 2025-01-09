import { IPost, IPostResponse, IComment, ICommentResponse, ILike, ICreatePostDTO, IUpdatePostDTO, ICreateCommentDTO, FeedFilter, FeedSortType } from '../../components/social/Feed/types';

class FeedService {
  private static instance: FeedService;
  private cache: Map<string, any>;

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): FeedService {
    if (!FeedService.instance) {
      FeedService.instance = new FeedService();
    }
    return FeedService.instance;
  }

  // Feed Posts
  public async getFeedPosts(
    page: number = 1,
    filter: FeedFilter = 'all',
    sortType: FeedSortType = 'latest'
  ): Promise<IPostResponse> {
    try {
      const cacheKey = `feed:${filter}:${sortType}:${page}`;
      const cachedData = this.cache.get(cacheKey);
      
      if (cachedData) {
        return cachedData;
      }

      // TODO: API 연동 후 실제 엔드포인트로 교체
      const response = await fetch(`/api/feed?page=${page}&filter=${filter}&sort=${sortType}`);
      const data = await response.json();

      this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      return this.handleError('Failed to fetch feed posts', error);
    }
  }

  public async createPost(postData: ICreatePostDTO): Promise<IPost> {
    try {
      // TODO: API 연동 후 실제 엔드포인트로 교체
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      this.clearFeedCache();
      return data;
    } catch (error) {
      return this.handleError('Failed to create post', error);
    }
  }

  public async updatePost(postId: string, postData: IUpdatePostDTO): Promise<IPost> {
    try {
      // TODO: API 연동 후 실제 엔드포인트로 교체
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      this.clearFeedCache();
      return data;
    } catch (error) {
      return this.handleError('Failed to update post', error);
    }
  }

  public async deletePost(postId: string): Promise<void> {
    try {
      // TODO: API 연동 후 실제 엔드포인트로 교체
      await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
      this.clearFeedCache();
    } catch (error) {
      return this.handleError('Failed to delete post', error);
    }
  }

  // Likes
  public async likePost(postId: string): Promise<ILike> {
    try {
      // TODO: API 연동 후 실제 엔드포인트로 교체
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
      });
      const data = await response.json();
      this.updateFeedCache(postId, { isLiked: true });
      return data;
    } catch (error) {
      return this.handleError('Failed to like post', error);
    }
  }

  public async unlikePost(postId: string): Promise<void> {
    try {
      // TODO: API 연동 후 실제 엔드포인트로 교체
      await fetch(`/api/posts/${postId}/like`, {
        method: 'DELETE',
      });
      this.updateFeedCache(postId, { isLiked: false });
    } catch (error) {
      return this.handleError('Failed to unlike post', error);
    }
  }

  // Comments
  public async addComment(commentData: ICreateCommentDTO): Promise<IComment> {
    try {
      // TODO: API 연동 후 실제 엔드포인트로 교체
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify(commentData),
      });
      const data = await response.json();
      this.updateFeedCache(commentData.postId, { comments: (prev: number) => prev + 1 });
      return data;
    } catch (error) {
      return this.handleError('Failed to add comment', error);
    }
  }

  public async deleteComment(commentId: string, postId: string): Promise<void> {
    try {
      // TODO: API 연동 후 실제 엔드포인트로 교체
      await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });
      this.updateFeedCache(postId, { comments: (prev: number) => prev - 1 });
    } catch (error) {
      return this.handleError('Failed to delete comment', error);
    }
  }

  // Cache management
  private updateFeedCache(postId: string, updates: any): void {
    this.cache.forEach((value, key) => {
      if (key.startsWith('feed:') && value.posts) {
        const updatedPosts = value.posts.map((post: IPost) => {
          if (post.id === postId) {
            return { ...post, ...updates };
          }
          return post;
        });
        this.cache.set(key, { ...value, posts: updatedPosts });
      }
    });
  }

  public clearFeedCache(): void {
    this.cache.clear();
  }

  private handleError(message: string, error: any): never {
    console.error(message, error);
    throw new Error(message);
  }
}

export default FeedService; 