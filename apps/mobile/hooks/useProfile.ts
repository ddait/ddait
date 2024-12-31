import { useState, useCallback, useEffect } from 'react';
import { IUserProfile, IActivityStats, IAchievement, IUserSettings } from '@/components/social/Profile/types';

const mockProfile: IUserProfile = {
  id: '1',
  name: '김운동',
  avatar: 'https://i.pravatar.cc/150?img=1',
  bio: '매일 운동하는 습관 만들기',
  level: 15,
  experience: 75,
  joinDate: new Date().toISOString(),
  settings: {
    notifications: {
      exercise: true,
      competition: true,
      social: true,
      system: true,
    },
    privacy: {
      profileVisibility: 'public',
      activitySharing: true,
      locationSharing: false,
    },
    theme: 'system',
    language: 'ko',
  },
};

const mockStats: IActivityStats = {
  totalWorkouts: 128,
  totalTime: 4320, // 72시간
  totalDistance: 450000, // 450km
  weeklyProgress: {
    workouts: 4,
    target: 5,
  },
  recentActivities: [
    {
      date: new Date().toISOString(),
      type: 'exercise',
      value: 60,
    },
    {
      date: new Date(Date.now() - 86400000).toISOString(),
      type: 'competition',
      value: 45,
    },
  ],
};

const mockAchievements: IAchievement[] = [
  {
    id: '1',
    title: '운동 입문자',
    description: '첫 운동을 완료하세요',
    icon: 'https://example.com/icons/beginner.png',
    progress: 100,
    isCompleted: true,
    unlockedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: '꾸준한 운동가',
    description: '7일 연속으로 운동을 완료하세요',
    icon: 'https://example.com/icons/streak.png',
    progress: 70,
    isCompleted: false,
  },
  {
    id: '3',
    title: '마라톤 완주',
    description: '누적 달리기 거리 42.195km 달성',
    icon: 'https://example.com/icons/marathon.png',
    progress: 85,
    isCompleted: false,
  },
];

export function useProfile() {
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [stats, setStats] = useState<IActivityStats | null>(null);
  const [achievements, setAchievements] = useState<IAchievement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: API 연동
      setProfile(mockProfile);
      setStats(mockStats);
      setAchievements(mockAchievements);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(async (data: Partial<IUserProfile>) => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: API 연동
      setProfile(prev => prev ? { ...prev, ...data } : null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateSettings = useCallback(async (key: string, value: any) => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: API 연동
      setProfile(prev => {
        if (!prev) return null;
        const settings = { ...prev.settings } as IUserSettings;
        const keys = key.split('.');
        let current: any = settings;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return { ...prev, settings };
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateTheme = useCallback(async (theme: 'light' | 'dark' | 'system') => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: API 연동
      setProfile(prev => {
        if (!prev || !prev.settings) return prev;
        return {
          ...prev,
          settings: {
            ...prev.settings,
            theme,
          },
        };
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateLanguage = useCallback(async (language: string) => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: API 연동
      setProfile(prev => {
        if (!prev || !prev.settings) return prev;
        return {
          ...prev,
          settings: {
            ...prev.settings,
            language,
          },
        };
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshProfile = useCallback(() => {
    return fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    stats,
    achievements,
    isLoading,
    error,
    updateProfile,
    updateSettings,
    updateTheme,
    updateLanguage,
    refreshProfile,
  };
} 