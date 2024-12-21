import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class Profile extends BaseEntity {
  @ApiProperty({ description: 'User height in centimeters' })
  height?: number;

  @ApiProperty({ description: 'User weight in kilograms' })
  weight?: number;

  @ApiProperty({ description: 'User birth date' })
  birth_date?: Date;

  @ApiProperty({ enum: Gender, description: 'User gender' })
  gender?: Gender;

  @ApiProperty({ type: [String], description: 'List of preferred exercises' })
  preferred_exercises?: string[];

  @ApiProperty({ description: 'User role', example: 'user' })
  role: string;

  @ApiProperty({ description: 'User email address' })
  email: string;

  @ApiProperty({ description: 'User display name' })
  username: string;

  @ApiProperty({ description: 'User avatar URL' })
  avatar_url?: string;
} 