import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { useColorScheme } from '../../../hooks/useColorScheme';

export const createStyles = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    typeCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      marginBottom: 12,
      borderRadius: 12,
      backgroundColor: colors.gray[100],
    },
    typeCardSelected: {
      backgroundColor: colors.primary,
    },
    typeCardDisabled: {
      opacity: 0.5,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.gray[200],
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    iconContainerSelected: {
      backgroundColor: colors.white,
    },
    icon: {
      fontSize: 24,
      color: colors.text,
    },
    iconSelected: {
      color: colors.primary,
    },
    contentContainer: {
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    titleSelected: {
      color: colors.white,
    },
    description: {
      fontSize: 14,
      color: colors.gray[600],
    },
    descriptionSelected: {
      color: colors.gray[100],
    },
  });
}; 