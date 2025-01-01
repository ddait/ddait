import React from 'react';
import { ScrollView, ActivityIndicator, View, ColorValue } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IProfileProps } from './types';
import { styles } from './styles';
import UserInfo from './components/UserInfo/UserInfo';
import ActivityStats from './components/ActivityStats/ActivityStats';
import Achievements from './components/Achievements/Achievements';
import Settings from './components/Settings';
import { useThemeColor } from '@/hooks/useThemeColor';

const Profile: React.FC<IProfileProps> = ({
  userProfile,
  activityStats,
  achievements,
  isLoading,
  onEditProfile,
  onSettingsPress,
  onAchievementPress,
  onSettingChange,
  onThemeChange,
  onLanguageChange,
}) => {
  const textColor = useThemeColor({}, 'text') as ColorValue;

  if (isLoading) {
    return (
      <ThemedView style={styles.loadingContainer} testID="profile-loading">
        <ActivityIndicator size="large" color={textColor} />
      </ThemedView>
    );
  }

  if (!userProfile || !activityStats || !achievements) {
    return (
      <ThemedView style={styles.loadingContainer} testID="profile-error">
        <ThemedText style={[styles.sectionTitle, { textAlign: 'center' }]}>
          프로필을 불러올 수 없습니다.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        testID="profile-scroll-view"
      >
        <View style={styles.section}>
          <UserInfo
            profile={userProfile}
            onEditPress={onEditProfile}
          />
        </View>

        <View style={styles.section}>
          <ActivityStats stats={activityStats} />
        </View>

        <View style={styles.section}>
          <Achievements
            achievements={achievements}
            onAchievementPress={onAchievementPress}
          />
        </View>

        {userProfile.settings && onSettingChange && onThemeChange && onLanguageChange && (
          <View style={styles.section}>
            <Settings
              settings={userProfile.settings}
              onSettingChange={onSettingChange}
              onThemeChange={onThemeChange}
              onLanguageChange={onLanguageChange}
            />
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
};

export default Profile; 