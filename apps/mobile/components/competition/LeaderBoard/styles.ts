import { StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

export function createStyles() {
  const isDarkMode = useColorScheme() === 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#333333' : '#EEEEEE',
    },
    periodButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginHorizontal: 4,
    },
    periodButtonActive: {
      backgroundColor: isDarkMode ? '#333333' : '#EEEEEE',
    },
    periodButtonText: {
      fontSize: 14,
      color: isDarkMode ? '#FFFFFF' : '#000000',
      opacity: 0.6,
    },
    periodButtonTextActive: {
      opacity: 1,
      fontWeight: '600',
    },
    list: {
      flex: 1,
    },
    listContent: {
      paddingVertical: 8,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
    },
    itemContainerHighlighted: {
      backgroundColor: isDarkMode ? '#1A1A1A' : '#F5F5F5',
    },
    rank: {
      width: 40,
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
      backgroundColor: isDarkMode ? '#333333' : '#EEEEEE',
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 16,
      fontWeight: '500',
      color: isDarkMode ? '#FFFFFF' : '#000000',
      marginBottom: 2,
    },
    score: {
      fontSize: 14,
      color: isDarkMode ? '#CCCCCC' : '#666666',
    },
    trend: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
    },
    trendIcon: {
      fontSize: 16,
      marginRight: 4,
    },
    trendUp: {
      color: '#4CAF50',
    },
    trendDown: {
      color: '#F44336',
    },
    trendSame: {
      color: isDarkMode ? '#666666' : '#999999',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    graphContainer: {
      height: 200,
      padding: 16,
      marginTop: 8,
    },
  });
} 