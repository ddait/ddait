import React, { useState } from 'react';
import { View, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ISettingsProps } from '../../types';
import { styles } from '../../styles';

const NotificationSettings: React.FC<{
  notifications: {
    exercise: boolean;
    competition: boolean;
    social: boolean;
    system: boolean;
  };
  onSettingChange: (key: string, value: boolean) => void;
}> = ({ notifications, onSettingChange }) => (
  <View style={styles.settingSection}>
    <ThemedText style={styles.sectionTitle}>알림 설정</ThemedText>
    
    <View style={styles.settingItem}>
      <ThemedText style={styles.settingLabel}>운동 알림</ThemedText>
      <Switch
        value={notifications.exercise}
        onValueChange={(value) => onSettingChange('notifications.exercise', value)}
      />
    </View>
    
    <View style={styles.settingItem}>
      <ThemedText style={styles.settingLabel}>경쟁 알림</ThemedText>
      <Switch
        value={notifications.competition}
        onValueChange={(value) => onSettingChange('notifications.competition', value)}
      />
    </View>
    
    <View style={styles.settingItem}>
      <ThemedText style={styles.settingLabel}>소셜 알림</ThemedText>
      <Switch
        value={notifications.social}
        onValueChange={(value) => onSettingChange('notifications.social', value)}
      />
    </View>
    
    <View style={styles.settingItem}>
      <ThemedText style={styles.settingLabel}>시스템 알림</ThemedText>
      <Switch
        value={notifications.system}
        onValueChange={(value) => onSettingChange('notifications.system', value)}
      />
    </View>
  </View>
);

const PrivacySettings: React.FC<{
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private';
    activitySharing: boolean;
    locationSharing: boolean;
  };
  onSettingChange: (key: string, value: any) => void;
}> = ({ privacy, onSettingChange }) => {
  const [showVisibilityPicker, setShowVisibilityPicker] = useState(false);

  return (
    <View style={styles.settingSection}>
      <ThemedText style={styles.sectionTitle}>개인정보 설정</ThemedText>
      
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => setShowVisibilityPicker(!showVisibilityPicker)}
      >
        <ThemedText style={styles.settingLabel}>프로필 공개 범위</ThemedText>
        <ThemedText style={styles.settingValue}>
          {privacy.profileVisibility === 'public' ? '전체 공개' :
           privacy.profileVisibility === 'friends' ? '친구 공개' : '비공개'}
        </ThemedText>
      </TouchableOpacity>
      
      {showVisibilityPicker && (
        <View style={styles.pickerContainer}>
          {(['public', 'friends', 'private'] as const).map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.pickerItem,
                privacy.profileVisibility === option && styles.pickerItemSelected
              ]}
              onPress={() => {
                onSettingChange('privacy.profileVisibility', option);
                setShowVisibilityPicker(false);
              }}
            >
              <ThemedText
                style={[
                  styles.pickerItemText,
                  privacy.profileVisibility === option && styles.pickerItemTextSelected
                ]}
              >
                {option === 'public' ? '전체 공개' :
                 option === 'friends' ? '친구 공개' : '비공개'}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      <View style={styles.settingItem}>
        <ThemedText style={styles.settingLabel}>활동 공유</ThemedText>
        <Switch
          value={privacy.activitySharing}
          onValueChange={(value) => onSettingChange('privacy.activitySharing', value)}
        />
      </View>
      
      <View style={styles.settingItem}>
        <ThemedText style={styles.settingLabel}>위치 공유</ThemedText>
        <Switch
          value={privacy.locationSharing}
          onValueChange={(value) => onSettingChange('privacy.locationSharing', value)}
        />
      </View>
    </View>
  );
};

const ThemeSettings: React.FC<{
  theme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
}> = ({ theme, onThemeChange }) => {
  const [showThemePicker, setShowThemePicker] = useState(false);

  return (
    <View style={styles.settingSection}>
      <ThemedText style={styles.sectionTitle}>테마 설정</ThemedText>
      
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => setShowThemePicker(!showThemePicker)}
      >
        <ThemedText style={styles.settingLabel}>테마</ThemedText>
        <ThemedText style={styles.settingValue}>
          {theme === 'light' ? '라이트' :
           theme === 'dark' ? '다크' : '시스템'}
        </ThemedText>
      </TouchableOpacity>
      
      {showThemePicker && (
        <View style={styles.pickerContainer}>
          {(['light', 'dark', 'system'] as const).map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.pickerItem,
                theme === option && styles.pickerItemSelected
              ]}
              onPress={() => {
                onThemeChange(option);
                setShowThemePicker(false);
              }}
            >
              <ThemedText
                style={[
                  styles.pickerItemText,
                  theme === option && styles.pickerItemTextSelected
                ]}
              >
                {option === 'light' ? '라이트' :
                 option === 'dark' ? '다크' : '시스템'}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const Settings: React.FC<ISettingsProps> = ({
  settings,
  onSettingChange,
  onThemeChange,
  onLanguageChange,
}) => {
  return (
    <ThemedView style={styles.settingsContainer}>
      <ScrollView>
        <NotificationSettings
          notifications={settings.notifications}
          onSettingChange={onSettingChange}
        />
        
        <PrivacySettings
          privacy={settings.privacy}
          onSettingChange={onSettingChange}
        />
        
        <ThemeSettings
          theme={settings.theme}
          onThemeChange={onThemeChange}
        />
      </ScrollView>
    </ThemedView>
  );
};

export default Settings; 