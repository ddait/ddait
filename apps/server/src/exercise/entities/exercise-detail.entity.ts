import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';

export enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export class ExerciseDetail extends BaseEntity {
  @ApiProperty({ description: 'Reference to exercise session' })
  session_id: string;

  @ApiProperty({ description: 'Name of the exercise' })
  exercise_name: string;

  @ApiProperty({ description: 'Category of the exercise' })
  exercise_category: string;

  @ApiProperty({ description: 'Number of sets', required: false })
  sets?: number;

  @ApiProperty({ description: 'Number of repetitions', required: false })
  reps?: number;

  @ApiProperty({ description: 'Weight used in kilograms', required: false })
  weight?: number;

  @ApiProperty({ description: 'Distance covered in meters', required: false })
  distance?: number;

  @ApiProperty({ description: 'Duration in seconds', required: false })
  duration?: number;

  @ApiProperty({ enum: Difficulty, description: 'Exercise difficulty level' })
  difficulty: Difficulty;

  @ApiProperty({ type: [String], description: 'Equipment used for the exercise' })
  equipment_used: string[];

  @ApiProperty({ description: 'Additional notes', required: false })
  notes?: string;

  @ApiProperty({ description: 'Soft delete flag' })
  is_deleted: boolean;
} 