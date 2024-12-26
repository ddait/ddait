import type { Friend } from '../FriendCard/types';
import type { RefreshControlProps } from 'react-native';

export interface FriendListProps {
  friends: Friend[];
  onFriendPress: (friend: Friend) => void;
  testID?: string;
  refreshControl?: React.ReactElement<RefreshControlProps>;
} 