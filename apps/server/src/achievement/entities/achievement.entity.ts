import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';

export enum AchievementStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export class Achievement extends BaseEntity {
  @ApiProperty({ description: 'ID of the user who earned the achievement' })
  user_id: string;

  @ApiProperty({ description: 'ID of the achievement template' })
  template_id: string;

  @ApiProperty({ description: 'Progress towards completion (0-100)' })
  progress: number;

  @ApiProperty({ enum: AchievementStatus, description: 'Status of the achievement' })
  status: AchievementStatus;

  @ApiProperty({ description: 'Timestamp when the achievement was completed', required: false })
  completed_at?: Date;
} 