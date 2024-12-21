import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { Difficulty } from './exercise-detail.entity';

export class ExerciseTemplate extends BaseEntity {
  @ApiProperty({ description: 'Name of the exercise template' })
  name: string;

  @ApiProperty({ description: 'Category of the exercise' })
  category: string;

  @ApiProperty({ description: 'Description of the exercise' })
  description?: string;

  @ApiProperty({ description: 'Default number of sets' })
  default_sets?: number;

  @ApiProperty({ description: 'Default number of repetitions' })
  default_reps?: number;

  @ApiProperty({ enum: Difficulty, description: 'Exercise difficulty level' })
  difficulty: Difficulty;

  @ApiProperty({ type: [String], description: 'Required equipment for the exercise' })
  equipment_required: string[];

  @ApiProperty({ description: 'Template active status' })
  is_active: boolean;
} 