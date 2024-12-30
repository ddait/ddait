import { StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

export function createStyles() {
  const isDarkMode = useColorScheme() === 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#333333' : '#EEEEEE',
    },
    dateText: {
      fontSize: 14,
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    filterButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: isDarkMode ? '#333333' : '#EEEEEE',
    },
    filterButtonText: {
      fontSize: 14,
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    card: {
      backgroundColor: isDarkMode ? '#171717' : '#FFFFFF',
      borderRadius: 12,
      marginHorizontal: 16,
      marginVertical: 8,
      padding: 16,
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
    dateTime: {
      fontSize: 14,
      color: isDarkMode ? '#A0A0A0' : '#666666',
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
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#333333' : '#EEEEEE',
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#000000',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: isDarkMode ? '#A0A0A0' : '#666666',
    },
    resultBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginLeft: 8,
    },
    resultBadgeWin: {
      backgroundColor: '#4CAF50',
    },
    resultBadgeLose: {
      backgroundColor: '#F44336',
    },
    resultBadgeDraw: {
      backgroundColor: '#9E9E9E',
    },
    resultText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '600',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    emptyText: {
      fontSize: 16,
      color: isDarkMode ? '#A0A0A0' : '#666666',
      textAlign: 'center',
    },
  });
} 