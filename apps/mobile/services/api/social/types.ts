export interface Profile {
  userId: string;
  nickname: string;
  bio?: string;
  profileImage?: string;
  level: number;
  experience: number;
  achievements: Achievement[];
  stats: UserStats;
  following: number;
  followers: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface UserStats {
  totalWorkouts: number;
  totalExercises: number;
  totalTime: number; // in minutes
  totalDistance: number; // in meters
  totalWeight: number; // in kg
  competitionsWon: number;
}

export interface Post {
  id: string;
  userId: string;
  type: 'WORKOUT' | 'ACHIEVEMENT' | 'COMPETITION';
  content: string;
  media?: string[];
  workoutSession?: string; // WorkoutSession ID
  achievement?: string; // Achievement ID
  competition?: string; // Competition ID
  likes: number;
  comments: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  likes: number;
  createdAt: string;
}

export interface CreatePostRequest {
  type: 'WORKOUT' | 'ACHIEVEMENT' | 'COMPETITION';
  content: string;
  media?: string[];
  workoutSession?: string;
  achievement?: string;
  competition?: string;
}

export interface UpdateProfileRequest {
  nickname?: string;
  bio?: string;
  profileImage?: string;
}

export interface CreateCommentRequest {
  content: string;
}

export interface FeedFilters {
  type?: 'WORKOUT' | 'ACHIEVEMENT' | 'COMPETITION';
  following?: boolean;
  userId?: string;
}

export interface SocialError {
  code: 'USER_NOT_FOUND' | 'POST_NOT_FOUND' | 'COMMENT_NOT_FOUND' | 'INVALID_CONTENT' | 'ALREADY_FOLLOWING';
  message: string;
} 