import React from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Profile from '@/components/social/Profile';
import { useProfile } from '@/hooks/useProfile';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const {
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
  } = useProfile();

  const handleEditProfile = () => {
    // TODO: 프로필 수정 화면으로 이동
  };

  const handleSettingsPress = () => {
    // TODO: 설정 화면으로 이동
  };

  const handleAchievementPress = () => {
    // TODO: 업적 상세 화면으로 이동
  };

  const handleSettingChange = (key: string, value: any) => {
    updateSettings(key, value);
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    updateTheme(theme);
  };

  const handleLanguageChange = (language: string) => {
    updateLanguage(language);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: '프로필',
          headerLargeTitle: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
          },
        }}
      />
      <Profile
        userProfile={profile || undefined}
        activityStats={stats || undefined}
        achievements={achievements}
        isLoading={isLoading}
        onEditProfile={handleEditProfile}
        onSettingsPress={handleSettingsPress}
        onAchievementPress={handleAchievementPress}
        onSettingChange={handleSettingChange}
        onThemeChange={handleThemeChange}
        onLanguageChange={handleLanguageChange}
      />
    </>
  );
} 