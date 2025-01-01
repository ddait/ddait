import { StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

export function createStyles() {
  const isDarkMode = useColorScheme() === 'dark';

  return StyleSheet.create({
    container: {
      marginVertical: 16,
    },
    scrollView: {
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
      paddingHorizontal: 16,
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    emptyText: {
      textAlign: 'center',
      color: isDarkMode ? '#A0A0A0' : '#666666',
      paddingVertical: 24,
    },
    card: {
      backgroundColor: isDarkMode ? '#171717' : '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      marginRight: 12,
      width: 280,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    matchType: {
      fontSize: 14,
      color: isDarkMode ? '#A0A0A0' : '#666666',
    },
    timeRemaining: {
      fontSize: 14,
      color: '#FF4B4B',
      fontWeight: '500',
    },
    participants: {
      marginBottom: 12,
    },
    participant: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    participantInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginRight: 8,
      backgroundColor: isDarkMode ? '#2C2C2C' : '#F0F0F0',
    },
    participantName: {
      fontSize: 16,
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    score: {
      fontSize: 18,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    progressBar: {
      height: 4,
      backgroundColor: isDarkMode ? '#2C2C2C' : '#F0F0F0',
      borderRadius: 2,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#FF4B4B',
    },
    skeletonCard: {
      opacity: 0.5,
    },
  });
} 