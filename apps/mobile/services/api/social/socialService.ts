import { AxiosInstance } from 'axios';
import {
  Profile,
  Post,
  Comment,
  CreatePostRequest,
  UpdateProfileRequest,
  CreateCommentRequest,
  FeedFilters,
  SocialError
} from './types';

export class SocialService {
  constructor(private readonly api: AxiosInstance) {}

  // Profile operations
  async getProfile(userId: string): Promise<Profile> {
    try {
      const response = await this.api.get<Profile>(`/users/${userId}/profile`);
      return response.data;
    } catch (error: any) {
      throw this.handleSocialError(error);
    }
  }

  async updateProfile(userId: string, request: UpdateProfileRequest): Promise<Profile> {
    try {
      const response = await this.api.patch<Profile>(`/users/${userId}/profile`, request);
      return response.data;
    } catch (error: any) {
      throw this.handleSocialError(error);
    }
  }

  async followUser(userId: string): Promise<void> {
    try {
      await this.api.post(`/users/${userId}/follow`);
    } catch (error: any) {
      throw this.handleSocialError(error);
    }
  }

  async unfollowUser(userId: string): Promise<void> {
    try {
      await this.api.post(`/users/${userId}/unfollow`);
    } catch (error: any) {
      throw this.handleSocialError(error);
    }
  }

  // Feed operations
  async getFeed(filters?: FeedFilters): Promise<Post[]> {
    try {
      const response = await this.api.get<Post[]>('/feed', {
        params: filters
      });
      return response.data;
    } catch (error: any) {
      throw this.handleSocialError(error);
    }
  }

  async createPost(request: CreatePostRequest): Promise<Post> {
    try {
      const response = await this.api.post<Post>('/posts', request);
      return response.data;
    } catch (error: any) {
      throw this.handleSocialError(error);
    }
  }

  async deletePost(postId: string): Promise<void> {
    try {
      await this.api.delete(`/posts/${postId}`);
    } catch (error: any) {
      throw this.handleSocialError(error);
    }
  }

  async likePost(postId: string): Promise<void> {
    try {
      await this.api.post(`/posts/${postId}/like`);
    } catch (error: any) {
      throw this.handleSocialError(error);
    }
  }

  async unlikePost(postId: string): Promise<void> {
    try {
      await this.api.post(`/posts/${postId}/unlike`);
    } catch (error: any) {
      throw this.handleSocialError(error);
    }
  }

  // Comment operations
  async getComments(postId: string): Promise<Comment[]> {
    try {
      const response = await this.api.get<Comment[]>(`/posts/${postId}/comments`);
      return response.data;
    } catch (error: any) {
      throw this.handleSocialError(error);
    }
  }

  async createComment(postId: string, request: CreateCommentRequest): Promise<Comment> {
    try {
      const response = await this.api.post<Comment>(`/posts/${postId}/comments`, request);
      return response.data;
    } catch (error: any) {
      throw this.handleSocialError(error);
    }
  }

  async deleteComment(postId: string, commentId: string): Promise<void> {
    try {
      await this.api.delete(`/posts/${postId}/comments/${commentId}`);
    } catch (error: any) {
      throw this.handleSocialError(error);
    }
  }

  async likeComment(postId: string, commentId: string): Promise<void> {
    try {
      await this.api.post(`/posts/${postId}/comments/${commentId}/like`);
    } catch (error: any) {
      throw this.handleSocialError(error);
    }
  }

  async unlikeComment(postId: string, commentId: string): Promise<void> {
    try {
      await this.api.post(`/posts/${postId}/comments/${commentId}/unlike`);
    } catch (error: any) {
      throw this.handleSocialError(error);
    }
  }

  private handleSocialError(error: any): SocialError {
    if (error.response?.data?.code) {
      return error.response.data as SocialError;
    }

    return {
      code: 'INVALID_CONTENT',
      message: 'An unexpected error occurred'
    };
  }
} 