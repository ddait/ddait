import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';

export enum RewardType {
  EXP = 'exp',
  BADGE = 'badge',
  ITEM = 'item',
  CURRENCY = 'currency',
}

export enum ValueType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  RANGE = 'range',
}

export class RewardTemplate extends BaseEntity {
  @ApiProperty({ enum: RewardType, description: 'Type of reward' })
  type: RewardType;

  @ApiProperty({ description: 'Title of the reward' })
  title: string;

  @ApiProperty({ description: 'Description of the reward' })
  description?: string;

  @ApiProperty({ enum: ValueType, description: 'Type of value calculation' })
  value_type: ValueType;

  @ApiProperty({ description: 'Value configuration for the reward' })
  value: Record<string, any>;

  @ApiProperty({ description: 'Conditions for earning the reward', required: false })
  conditions?: Record<string, any>;

  @ApiProperty({ description: 'Template active status' })
  is_active: boolean;
} 