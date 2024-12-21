import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';

export enum FriendshipStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  BLOCKED = 'blocked',
}

export class Friendship extends BaseEntity {
  @ApiProperty({ description: 'ID of the user who initiated the friendship' })
  user_id: string;

  @ApiProperty({ description: 'ID of the friend' })
  friend_id: string;

  @ApiProperty({ enum: FriendshipStatus, description: 'Status of the friendship' })
  status: FriendshipStatus;
} 