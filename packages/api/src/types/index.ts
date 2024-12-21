// Auth types
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
}

// Exercise types
export interface ExerciseSession {
  id: string;
  userId: string;
  type: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  calories?: number;
  status: 'active' | 'paused' | 'completed';
}

// Competition types
export interface Competition {
  id: string;
  type: string;
  status: string;
  participants: string[];
  startTime?: Date;
  endTime?: Date;
  scores: Record<string, number>;
} 