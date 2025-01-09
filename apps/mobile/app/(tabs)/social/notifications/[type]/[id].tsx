import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { NotificationType } from '@/components/social/Notifications/types';

export default function NotificationDetailScreen() {
  const { type, id } = useLocalSearchParams<{ type: NotificationType; id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    // 알림 타입별 적절한 화면으로 리다이렉트
    switch (type) {
      case 'friend_request':
      case 'friend_accept':
        router.replace({ pathname: '../../../profile/[id]', params: { id } });
        break;
      case 'competition':
      case 'competition_invite':
        router.replace({ pathname: '../../../../../competition/detail/[id]', params: { id } });
        break;
      case 'exercise':
        router.replace({ pathname: '../../../../../exercise/detail/[id]', params: { id } });
        break;
      case 'achievement':
        router.replace({ pathname: '../../../../../profile/achievements/[id]', params: { id } });
        break;
      case 'chat':
        router.replace({ pathname: '../../../chat/[id]', params: { id } });
        break;
      case 'like':
      case 'comment':
        router.replace({ pathname: '../../../post/[id]', params: { id } });
        break;
      case 'system':
        // 시스템 알림은 별도 처리 필요
        break;
      default:
        router.back();
    }
  }, [type, id, router]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 