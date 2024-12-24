import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { useColorScheme } from '../../../hooks/useColorScheme';

export const createStyles = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    categoryContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background,
    },
    categoryButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginRight: 8,
      borderRadius: 20,
      backgroundColor: colors.gray[100],
    },
    categoryButtonActive: {
      backgroundColor: colors.primary,
    },
    categoryText: {
      fontSize: 14,
      color: colors.text,
    },
    categoryTextActive: {
      color: colors.white,
    },
    workoutList: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    workoutItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      marginBottom: 8,
      borderRadius: 12,
      backgroundColor: colors.gray[100],
    },
    workoutItemActive: {
      backgroundColor: colors.primary,
    },
    workoutIcon: {
      fontSize: 24,
      marginRight: 12,
    },
    workoutInfo: {
      flex: 1,
    },
    workoutName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    workoutNameActive: {
      color: colors.white,
    },
    workoutDescription: {
      fontSize: 14,
      color: colors.gray[600],
      marginTop: 4,
    },
    workoutDescriptionActive: {
      color: colors.gray[100],
    },
    disabled: {
      opacity: 0.5,
    },
  });
}; 