import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import ActivityFeed from '@/components/social/ActivityFeed';
import FriendsList from '@/components/social/FriendsList';
import ChatList from '@/components/social/ChatList';
import Notifications from '@/components/social/Notifications';
import { useActivities } from '@/hooks/useActivities';
import { useFriends } from '@/hooks/useFriends';
import { useChats } from '@/hooks/useChats';
import { useNotifications } from '@/hooks/useNotifications';

const Tab = createMaterialTopTabNavigator();

function ActivityTab() {
  const { activities, isLoading, error, refetch, loadMore } = useActivities();

  if (error) return <ErrorView message="활동 피드를 불러오는데 실패했습니다." onRetry={refetch} />;

  return (
    <ActivityFeed
      activities={activities}
      isLoading={isLoading}
      onRefresh={refetch}
      onLoadMore={loadMore}
    />
  );
}

function FriendsTab() {
  const {
    friends,
    friendRequests,
    isLoading,
    error,
    refetch,
    loadMore,
    handleAcceptRequest,
    handleRejectRequest,
  } = useFriends();

  if (error) return <ErrorView message="친구 목록을 불러오는데 실패했습니다." onRetry={refetch} />;

  return (
    <FriendsList
      friends={friends}
      friendRequests={friendRequests}
      isLoading={isLoading}
      onRefresh={refetch}
      onLoadMore={loadMore}
      onAcceptRequest={handleAcceptRequest}
      onRejectRequest={handleRejectRequest}
    />
  );
}

function ChatsTab() {
  const { chats, isLoading, error, refetch, loadMore } = useChats();

  if (error) return <ErrorView message="채팅 목록을 불러오는데 실패했습니다." onRetry={refetch} />;

  return (
    <ChatList
      chatRooms={chats}
      isLoading={isLoading}
      onRefresh={refetch}
      onLoadMore={loadMore}
    />
  );
}

function NotificationsTab() {
  const { notifications, isLoading, error, refetch, loadMore, markAsRead } = useNotifications();

  if (error) return <ErrorView message="알림을 불러오는데 실패했습니다." onRetry={refetch} />;

  return (
    <Notifications
      notifications={notifications}
      isLoading={isLoading}
      onRefresh={refetch}
      onLoadMore={loadMore}
      onMarkAsRead={markAsRead}
    />
  );
}

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

export default function SocialScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: '소셜',
          headerLargeTitle: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
          },
        }}
      />
      
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.background,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text,
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
          },
        }}
      >
        <Tab.Screen
          name="Activity"
          component={ActivityTab}
          options={{ title: '활동' }}
        />
        <Tab.Screen
          name="Friends"
          component={FriendsTab}
          options={{ title: '친구' }}
        />
        <Tab.Screen
          name="Chats"
          component={ChatsTab}
          options={{ title: '채팅' }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsTab}
          options={{ title: '알림' }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
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