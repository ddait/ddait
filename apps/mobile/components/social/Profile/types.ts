export interface IUserProfile {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  level: number;
  experience: number;
  joinDate: string;
  settings?: IUserSettings;
}

export interface IUserSettings {
  notifications: {
    exercise: boolean;
    competition: boolean;
    social: boolean;
    system: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private';
    activitySharing: boolean;
    locationSharing: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export interface IActivityStats {
  totalWorkouts: number;
  totalTime: number;
  totalDistance: number;
  weeklyProgress: {
    workouts: number;
    target: number;
  };
  recentActivities: {
    date: string;
    type: 'exercise' | 'competition';
    value: number;
  }[];
}

export interface IAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  isCompleted: boolean;
  unlockedAt?: string;
}
export interface IProfileProps {
  userProfile?: IUserProfile;
  activityStats?: IActivityStats;
  achievements?: IAchievement[];
  isLoading?: boolean;
  onEditProfile?: () => void;
  onSettingsPress?: () => void;
  onAchievementPress?: (achievement: IAchievement) => void;
  onSettingChange?: (key: string, value: any) => void;
  onThemeChange?: (theme: 'light' | 'dark' | 'system') => void;
  onLanguageChange?: (language: string) => void;
}

export interface IUserInfoProps {
  profile: IUserProfile;
  onEditPress?: () => void;
}

export interface IActivityStatsProps {
  stats: IActivityStats;
}

export interface IAchievementsProps {
  achievements: IAchievement[];
  onAchievementPress?: (achievement: IAchievement) => void;
}

export interface ISettingsProps {
  settings: IUserSettings;
  onSettingChange: (key: string, value: any) => void;
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
  onLanguageChange: (language: string) => void;
} 