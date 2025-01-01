import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IUserInfoProps } from '../../types';
import { styles } from '../../styles';
import { useThemeColor } from '@/hooks/useThemeColor';

const UserInfo: React.FC<IUserInfoProps> = ({ profile, onEditPress }) => {
  const textColor = useThemeColor({}, 'text');
  const experiencePercentage = (profile.experience % 100);

  return (
    <View style={styles.userInfoContainer}>
      {profile.avatar ? (
        <Image
          source={{ uri: profile.avatar }}
          style={styles.avatar}
        />
      ) : (
        <View style={[styles.avatar, { backgroundColor: '#E5E5E5' }]} />
      )}
      
      <ThemedText style={styles.userName}>{profile.name}</ThemedText>
      
      {profile.bio && (
        <ThemedText style={styles.userBio}>{profile.bio}</ThemedText>
      )}
      
      <View style={styles.levelContainer}>
        <ThemedText style={styles.levelText}>레벨 {profile.level}</ThemedText>
        <ThemedText style={[styles.levelText, { color: '#666666' }]}>
          ({experiencePercentage}%)
        </ThemedText>
      </View>
      
      <View style={styles.experienceBar}>
        <View
          style={[
            styles.experienceFill,
            { width: `${experiencePercentage}%` }
          ]}
        />
      </View>
      
      <TouchableOpacity
        style={styles.editButton}
        onPress={onEditPress}
        testID="edit-profile-button"
      >
        <ThemedText style={styles.editButtonText}>프로필 수정</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default UserInfo; 