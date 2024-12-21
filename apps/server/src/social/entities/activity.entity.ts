import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';

export enum ActivityType {
  EXERCISE = 'exercise',
  COMPETITION = 'competition',
  ACHIEVEMENT = 'achievement',
  SOCIAL = 'social',
  SYSTEM = 'system',
}

export enum ActivityVisibility {
  PUBLIC = 'public',
  FRIENDS = 'friends',
  PRIVATE = 'private',
}

export class Activity extends BaseEntity {
  @ApiProperty({ description: 'ID of the user who created the activity' })
  user_id: string;

  @ApiProperty({ enum: ActivityType, description: 'Type of activity' })
  type: ActivityType;

  @ApiProperty({ description: 'Category of the activity' })
  category: string;

  @ApiProperty({ description: 'Content of the activity' })
  content: Record<string, any>;

  @ApiProperty({ enum: ActivityVisibility, description: 'Visibility of the activity' })
  visibility: ActivityVisibility;

  @ApiProperty({ description: 'Soft delete flag' })
  is_deleted: boolean;
} 