export type FriendStatus = 'online' | 'offline' | 'exercising';

export interface Friend {
  id: string;
  name: string;
  status: FriendStatus;
  profileImage: string;
}

export interface FriendCardProps {
  friend: Friend;
  onPress: (friend: Friend) => void;
  testID?: string;
} 