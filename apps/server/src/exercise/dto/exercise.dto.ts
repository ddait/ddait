import { IsString, IsNumber, IsOptional, IsDate, IsEnum, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ExerciseType {
  WEIGHT = 'weight',
  CARDIO = 'cardio',
  YOGA = 'yoga',
  OTHER = 'other'
}

export enum SessionStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed'
}

export class CreateSessionDto {
  @ApiProperty({
    enum: ExerciseType,
    example: ExerciseType.WEIGHT,
    description: '운동 유형'
  })
  @IsEnum(ExerciseType)
  type: ExerciseType;

  @ApiProperty({
    example: '가슴 운동',
    description: '운동 제목'
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: ['벤치프레스', '푸시업'],
    description: '운동 목록',
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  exercises?: string[];

  @ApiProperty({
    example: 60,
    description: '예상 운동 시간(분)',
    required: false
  })
  @IsOptional()
  @IsNumber()
  duration?: number;
}

export class UpdateSessionDto {
  @ApiProperty({
    example: '가슴 운동',
    description: '운동 제목',
    required: false
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: ['벤치프레스', '푸시업'],
    description: '운동 목록',
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  exercises?: string[];

  @ApiProperty({
    example: 60,
    description: '운동 시간(분)',
    required: false
  })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiProperty({
    example: 500,
    description: '소모 칼로리',
    required: false
  })
  @IsOptional()
  @IsNumber()
  calories?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  endTime?: Date;

  @ApiProperty({ required: false, enum: SessionStatus })
  @IsOptional()
  @IsEnum(SessionStatus)
  status?: SessionStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  note?: string;
}

export class SessionResponseDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ enum: ExerciseType, example: ExerciseType.WEIGHT })
  type: ExerciseType;

  @ApiProperty({ example: '가슴 운동' })
  title: string;

  @ApiProperty({ example: ['벤치프레스', '푸시업'] })
  exercises: string[];

  @ApiProperty({ example: 60 })
  duration: number;

  @ApiProperty({ example: 500 })
  calories: number;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  startTime: Date;

  @ApiProperty({ example: '2024-01-01T01:00:00Z' })
  endTime: Date;

  @ApiProperty({ enum: SessionStatus })
  status: SessionStatus;

  @ApiProperty({ required: false })
  note?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
} 