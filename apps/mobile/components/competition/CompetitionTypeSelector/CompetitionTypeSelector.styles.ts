import { StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

export function createStyles() {
  const isDarkMode = useColorScheme() === 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      margin: -8,
    },
    gridItem: {
      width: '48%',
      margin: 8,
    },
    typeCard: {
      flexDirection: 'column',
      alignItems: 'center',
      padding: 16,
      borderRadius: 12,
      backgroundColor: isDarkMode ? '#171717' : '#F7F7F7',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    typeCardSelected: {
      backgroundColor: isDarkMode ? '#2C2C2C' : '#E8E8E8',
    },
    typeCardDisabled: {
      opacity: 0.5,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: isDarkMode ? '#2C2C2C' : '#E8E8E8',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    iconContainerSelected: {
      backgroundColor: isDarkMode ? '#3C3C3C' : '#D8D8D8',
    },
    icon: {
      fontSize: 24,
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    iconSelected: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    contentContainer: {
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
      color: isDarkMode ? '#FFFFFF' : '#000000',
      textAlign: 'center',
    },
    titleSelected: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    description: {
      fontSize: 12,
      color: isDarkMode ? '#A0A0A0' : '#666666',
      textAlign: 'center',
    },
    descriptionSelected: {
      color: isDarkMode ? '#B0B0B0' : '#444444',
    },
  });
} 