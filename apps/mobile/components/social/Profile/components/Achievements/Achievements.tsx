import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IAchievementsProps, IAchievement } from '../../types';
import { styles } from '../../styles';

const AchievementCard: React.FC<{
  achievement: IAchievement;
  onPress?: (achievement: IAchievement) => void;
}> = ({ achievement, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.achievementCard}
      onPress={() => onPress?.(achievement)}
      testID={`achievement-card-${achievement.id}`}
    >
      {achievement.icon ? (
        <Image
          source={{ uri: achievement.icon }}
          style={styles.achievementIcon}
        />
      ) : (
        <View style={styles.achievementIcon} />
      )}
      
      <View style={styles.achievementInfo}>
        <ThemedText style={styles.achievementTitle}>
          {achievement.title}
        </ThemedText>
        
        <ThemedText style={styles.achievementDescription}>
          {achievement.description}
        </ThemedText>
        
        <View style={styles.achievementProgress}>
          <View
            style={[
              styles.achievementProgressFill,
              { width: `${achievement.progress}%` }
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Achievements: React.FC<IAchievementsProps> = ({
  achievements,
  onAchievementPress,
}) => {
  const completedAchievements = achievements.filter(a => a.isCompleted);
  const inProgressAchievements = achievements.filter(a => !a.isCompleted);

  return (
    <View style={styles.achievementsContainer}>
      <ThemedText style={styles.sectionTitle}>업적</ThemedText>
      
      {inProgressAchievements.length > 0 && (
        <>
          <ThemedText style={[styles.sectionTitle, { fontSize: 16 }]}>
            진행 중
          </ThemedText>
          {inProgressAchievements.map(achievement => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              onPress={onAchievementPress}
            />
          ))}
        </>
      )}
      
      {completedAchievements.length > 0 && (
        <>
          <ThemedText style={[styles.sectionTitle, { fontSize: 16 }]}>
            달성 완료
          </ThemedText>
          {completedAchievements.map(achievement => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              onPress={onAchievementPress}
            />
          ))}
        </>
      )}
    </View>
  );
};

export default Achievements; 