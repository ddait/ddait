import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Notifications from '@/components/social/Notifications';
import { useNotifications } from '@/hooks/useNotifications';

function ErrorView({ message, onRetry }: { message: string; onRetry: () => void }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, styles.centered]}>
      <Text style={[styles.errorText, { color: colors.text }]}>{message}</Text>
      <TouchableOpacity
        style={[styles.retryButton, { backgroundColor: colors.primary }]}
        onPress={onRetry}
      >
        <Text style={[styles.retryText, { color: colors.background }]}>다시 시도</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function NotificationScreen() {
  const { notifications, isLoading, error, refetch, loadMore, markAsRead } = useNotifications();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  if (error) {
    return <ErrorView message="알림을 불러오는데 실패했습니다." onRetry={refetch} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Notifications
        notifications={notifications}
        isLoading={isLoading}
        onRefresh={refetch}
        onLoadMore={loadMore}
        onMarkAsRead={markAsRead}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryText: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 