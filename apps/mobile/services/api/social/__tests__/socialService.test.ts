import { SocialService } from '../socialService';
import {
  Profile,
  Post,
  Comment,
  CreatePostRequest,
  UpdateProfileRequest,
  CreateCommentRequest,
  FeedFilters
} from '../types';

describe('SocialService', () => {
  let socialService: SocialService;
  let mockApi: any;

  const mockProfile: Profile = {
    userId: 'user1',
    nickname: 'fitnessUser',
    bio: 'Fitness enthusiast',
    level: 10,
    experience: 5000,
    achievements: [
      {
        id: 'achievement1',
        title: 'First Workout',
        description: 'Complete your first workout',
        icon: 'trophy',
        unlockedAt: '2024-01-01T00:00:00Z'
      }
    ],
    stats: {
      totalWorkouts: 50,
      totalExercises: 300,
      totalTime: 3000,
      totalDistance: 100000,
      totalWeight: 10000,
      competitionsWon: 5
    },
    following: 100,
    followers: 80
  };

  const mockPost: Post = {
    id: 'post1',
    userId: 'user1',
    type: 'WORKOUT',
    content: 'Great workout today!',
    workoutSession: 'session1',
    likes: 10,
    comments: 5,
    createdAt: '2024-01-01T00:00:00Z'
  };

  const mockComment: Comment = {
    id: 'comment1',
    postId: 'post1',
    userId: 'user2',
    content: 'Keep it up!',
    likes: 2,
    createdAt: '2024-01-01T00:00:00Z'
  };

  beforeEach(() => {
    mockApi = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn()
    };
    socialService = new SocialService(mockApi);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Profile operations', () => {
    it('should get user profile', async () => {
      mockApi.get.mockResolvedValueOnce({ data: mockProfile });

      const profile = await socialService.getProfile('user1');

      expect(mockApi.get).toHaveBeenCalledWith('/users/user1/profile');
      expect(profile).toEqual(mockProfile);
    });

    it('should update user profile', async () => {
      const updateRequest: UpdateProfileRequest = {
        nickname: 'newNickname',
        bio: 'Updated bio'
      };
      mockApi.patch.mockResolvedValueOnce({ data: { ...mockProfile, ...updateRequest } });

      const profile = await socialService.updateProfile('user1', updateRequest);

      expect(mockApi.patch).toHaveBeenCalledWith('/users/user1/profile', updateRequest);
      expect(profile.nickname).toBe(updateRequest.nickname);
      expect(profile.bio).toBe(updateRequest.bio);
    });

    it('should follow user', async () => {
      await socialService.followUser('user2');

      expect(mockApi.post).toHaveBeenCalledWith('/users/user2/follow');
    });

    it('should unfollow user', async () => {
      await socialService.unfollowUser('user2');

      expect(mockApi.post).toHaveBeenCalledWith('/users/user2/unfollow');
    });
  });

  describe('Feed operations', () => {
    it('should get feed with filters', async () => {
      const filters: FeedFilters = {
        type: 'WORKOUT',
        following: true
      };
      mockApi.get.mockResolvedValueOnce({ data: [mockPost] });

      const posts = await socialService.getFeed(filters);

      expect(mockApi.get).toHaveBeenCalledWith('/feed', { params: filters });
      expect(posts).toEqual([mockPost]);
    });

    it('should create post', async () => {
      const createRequest: CreatePostRequest = {
        type: 'WORKOUT',
        content: 'New workout post',
        workoutSession: 'session1'
      };
      mockApi.post.mockResolvedValueOnce({ data: mockPost });

      const post = await socialService.createPost(createRequest);

      expect(mockApi.post).toHaveBeenCalledWith('/posts', createRequest);
      expect(post).toEqual(mockPost);
    });

    it('should delete post', async () => {
      await socialService.deletePost('post1');

      expect(mockApi.delete).toHaveBeenCalledWith('/posts/post1');
    });

    it('should like post', async () => {
      await socialService.likePost('post1');

      expect(mockApi.post).toHaveBeenCalledWith('/posts/post1/like');
    });

    it('should unlike post', async () => {
      await socialService.unlikePost('post1');

      expect(mockApi.post).toHaveBeenCalledWith('/posts/post1/unlike');
    });
  });

  describe('Comment operations', () => {
    it('should get comments', async () => {
      mockApi.get.mockResolvedValueOnce({ data: [mockComment] });

      const comments = await socialService.getComments('post1');

      expect(mockApi.get).toHaveBeenCalledWith('/posts/post1/comments');
      expect(comments).toEqual([mockComment]);
    });

    it('should create comment', async () => {
      const createRequest: CreateCommentRequest = {
        content: 'New comment'
      };
      mockApi.post.mockResolvedValueOnce({ data: mockComment });

      const comment = await socialService.createComment('post1', createRequest);

      expect(mockApi.post).toHaveBeenCalledWith('/posts/post1/comments', createRequest);
      expect(comment).toEqual(mockComment);
    });

    it('should delete comment', async () => {
      await socialService.deleteComment('post1', 'comment1');

      expect(mockApi.delete).toHaveBeenCalledWith('/posts/post1/comments/comment1');
    });

    it('should like comment', async () => {
      await socialService.likeComment('post1', 'comment1');

      expect(mockApi.post).toHaveBeenCalledWith('/posts/post1/comments/comment1/like');
    });

    it('should unlike comment', async () => {
      await socialService.unlikeComment('post1', 'comment1');

      expect(mockApi.post).toHaveBeenCalledWith('/posts/post1/comments/comment1/unlike');
    });

    it('should handle social error', async () => {
      const mockError = {
        response: {
          data: {
            code: 'USER_NOT_FOUND',
            message: 'User not found'
          }
        }
      };
      mockApi.get.mockRejectedValueOnce(mockError);

      await expect(socialService.getProfile('invalid-user')).rejects.toEqual(mockError.response.data);
    });
  });
}); 