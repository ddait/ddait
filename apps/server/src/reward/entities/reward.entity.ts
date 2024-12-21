import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { RewardType } from './reward-template.entity';

export enum RewardStatus {
  ACTIVE = 'active',
  USED = 'used',
  EXPIRED = 'expired',
}

export class Reward extends BaseEntity {
  @ApiProperty({ description: 'ID of the user who earned the reward' })
  user_id: string;

  @ApiProperty({ description: 'ID of the reward template' })
  template_id: string;

  @ApiProperty({ enum: RewardType, description: 'Type of reward' })
  type: RewardType;

  @ApiProperty({ description: 'Amount of the reward' })
  amount: number;

  @ApiProperty({ enum: RewardStatus, description: 'Status of the reward' })
  status: RewardStatus;

  @ApiProperty({ description: 'Expiration timestamp', required: false })
  expires_at?: Date;
} 