import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';

export class AchievementTemplate extends BaseEntity {
  @ApiProperty({ description: 'Type of achievement' })
  type: string;

  @ApiProperty({ description: 'Title of the achievement' })
  title: string;

  @ApiProperty({ description: 'Description of the achievement' })
  description?: string;

  @ApiProperty({ description: 'Category of the achievement' })
  category: string;

  @ApiProperty({ description: 'Requirements to earn the achievement' })
  requirements: Record<string, any>;

  @ApiProperty({ description: 'Rewards for earning the achievement' })
  rewards: Record<string, any>;

  @ApiProperty({ description: 'Template active status' })
  is_active: boolean;
} 