import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import PushNotificationService from '@/services/notification/PushNotificationService';
import { useNotificationStore } from '@/stores/NotificationStore';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { unreadCount } = useNotificationStore();

  useEffect(() => {
    const pushNotificationService = PushNotificationService.getInstance();

    // 푸시 알림 초기화
    const initPushNotifications = async () => {
      const token = await pushNotificationService.registerForPushNotifications();
      if (token) {
        // TODO: 토큰을 서버에 전송
        console.log('Push token:', token);
      }
    };

    // 알림 수신 리스너
    const subscription = pushNotificationService.addNotificationReceivedListener(
      (notification) => {
        // TODO: 알림 처리 로직 구현
        console.log('Notification received:', notification);
      }
    );

    // 알림 응답 리스너 (알림 클릭 등)
    const responseSubscription = pushNotificationService.addNotificationResponseReceivedListener(
      (response) => {
        // TODO: 알림 응답 처리 로직 구현
        console.log('Notification response:', response);
      }
    );

    initPushNotifications();

    return () => {
      pushNotificationService.removeNotificationSubscription(subscription);
      pushNotificationService.removeNotificationSubscription(responseSubscription);
    };
  }, []);

  // 앱 배지 수 업데이트
  useEffect(() => {
    const pushNotificationService = PushNotificationService.getInstance();
    pushNotificationService.setBadgeCount(unreadCount);
  }, [unreadCount]);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    />
  );
}
