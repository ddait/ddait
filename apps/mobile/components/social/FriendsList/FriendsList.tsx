import React, { useState, useCallback } from 'react';
import {
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  View,
  TouchableOpacity,
  ColorValue,
  Image,
} from 'react-native';
import { ThemedView } from '../../ThemedView';
import { ThemedText } from '../../ThemedText';
import { IFriendsListProps, IFriend, IFriendRequest } from './types';
import { styles } from './styles';
import { useThemeColor } from '../../../hooks/useThemeColor';
import FriendCard from './FriendCard';

const FriendRequestItem: React.FC<{
  request: IFriendRequest;
  onAccept?: (requestId: string) => void;
  onReject?: (requestId: string) => void;
}> = ({ request, onAccept, onReject }) => {
  const backgroundColor = useThemeColor({}, 'cardBackground') as ColorValue;

  return (
    <View style={styles.friendCard}>
      <View style={styles.avatarContainer}>
        {request.avatar ? (
          <Image
            source={{ uri: request.avatar }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatar} />
        )}
      </View>
      <View style={styles.contentContainer}>
        <ThemedText style={styles.name}>{request.name}</ThemedText>
        <View style={styles.requestActions}>
          <TouchableOpacity
            testID={`accept-request-button-${request.id}`}
            style={styles.acceptButton}
            onPress={() => onAccept?.(request.id)}
          >
            <ThemedText style={styles.buttonText}>수락</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            testID={`reject-request-button-${request.id}`}
            style={styles.rejectButton}
            onPress={() => onReject?.(request.id)}
          >
            <ThemedText style={styles.buttonText}>거절</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const FriendsList: React.FC<IFriendsListProps> = ({
  friends = [],
  friendRequests = [],
  isLoading = false,
  onAcceptRequest,
  onRejectRequest,
  onFriendPress,
  onRefresh,
  onLoadMore,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const backgroundColor = useThemeColor({}, 'background') as ColorValue;
  const textColor = useThemeColor({}, 'text') as ColorValue;

  console.log('Theme colors:', { backgroundColor, textColor });

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
    onSearch?.(text);
  }, [onSearch]);

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderFriendRequest = useCallback(({ item }: { item: IFriendRequest }) => {
    return (
      <FriendRequestItem
        request={item}
        onAccept={onAcceptRequest}
        onReject={onRejectRequest}
      />
    );
  }, [onAcceptRequest, onRejectRequest]);

  const renderFriend = useCallback(({ item }: { item: IFriend }) => {
    console.log('Rendering friend:', item);
    return (
      <FriendCard friend={item} onPress={onFriendPress} />
    );
  }, [onFriendPress]);

  if (isLoading && !friends.length && !friendRequests.length) {
    console.log('Rendering loading state');
    return (
      <ThemedView style={[styles.loadingContainer]} testID="friends-list-loading">
        <ActivityIndicator size="large" color={textColor} />
      </ThemedView>
    );
  }

  if (!friends.length && !friendRequests.length) {
    console.log('Rendering empty state');
    return (
      <ThemedView style={[styles.emptyContainer]} testID="friends-list-empty">
        <ThemedText style={styles.emptyText}>아직 친구가 없습니다</ThemedText>
      </ThemedView>
    );
  }

  console.log('Rendering main list');
  return (
    <ThemedView style={styles.container}>
      <FlatList
        testID="friends-list"
        style={styles.container}
        ListHeaderComponent={
          <>
            <View style={styles.searchContainer}>
              <TextInput
                testID="friends-search-input"
                style={styles.searchInput}
                placeholder="친구 검색"
                value={searchQuery}
                onChangeText={handleSearch}
                placeholderTextColor="#737373"
              />
            </View>
            {friendRequests.length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <ThemedText style={styles.sectionTitle}>친구 요청</ThemedText>
                </View>
                {friendRequests.map(request => (
                  <FriendRequestItem
                    key={request.id}
                    request={request}
                    onAccept={onAcceptRequest}
                    onReject={onRejectRequest}
                  />
                ))}
                <View style={styles.sectionHeader}>
                  <ThemedText style={styles.sectionTitle}>친구 목록</ThemedText>
                </View>
              </>
            )}
          </>
        }
        data={filteredFriends}
        renderItem={renderFriend}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            tintColor={textColor}
          />
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
      />
     </ThemedView> 
  );
};

export default FriendsList; 