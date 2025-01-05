import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useNotificationStore } from '@/stores/NotificationStore';
import Badge from '../Badge';

export default function HeaderRight() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { unreadCount } = useNotificationStore();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.iconButton}
        onPress={() => router.push('/(tabs)/social/chat')}
      >
        <Ionicons name="chatbubble-outline" size={24} color={colors.text} />
        {/* TODO: 채팅 알림 수 연동 */}
        <Badge count={0} />
      </Pressable>
      <Pressable
        style={styles.iconButton}
        onPress={() => router.push('/(tabs)/social/notifications')}
      >
        <Ionicons name="notifications-outline" size={24} color={colors.text} />
        {unreadCount > 0 && <Badge count={unreadCount} />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
    gap: 16,
  },
  iconButton: {
    position: 'relative',
    padding: 4,
  },
}); 