import { IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber, IsObject, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ExerciseType {
  RUNNING = 'RUNNING',
  CYCLING = 'CYCLING',
  SWIMMING = 'SWIMMING',
  WEIGHT_TRAINING = 'WEIGHT_TRAINING',
  YOGA = 'YOGA',
  OTHER = 'OTHER'
}

export enum ExerciseStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export class CreateExerciseSessionDto {
  @ApiProperty({ enum: ExerciseType, description: '운동 유형' })
  @IsEnum(ExerciseType)
  @IsNotEmpty()
  exerciseType: ExerciseType;

  @ApiProperty({ description: '운동 시작 시간' })
  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ description: '추가 메타데이터', required: false })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}

export class UpdateExerciseSessionDto {
  @ApiProperty({ description: '운동 종료 시간', required: false })
  @IsDateString()
  @IsOptional()
  endTime?: string;

  @ApiProperty({ description: '운동 시간(초)', required: false })
  @IsNumber()
  @IsOptional()
  duration?: number;

  @ApiProperty({ description: '소모 칼로리', required: false })
  @IsNumber()
  @IsOptional()
  calories?: number;

  @ApiProperty({ enum: ExerciseStatus, description: '운동 상태', required: false })
  @IsEnum(ExerciseStatus)
  @IsOptional()
  status?: ExerciseStatus;

  @ApiProperty({ description: '추가 메타데이터', required: false })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}

export class ExerciseSessionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ enum: ExerciseType })
  exerciseType: ExerciseType;

  @ApiProperty()
  startTime: string;

  @ApiProperty({ required: false })
  endTime?: string;

  @ApiProperty({ required: false })
  duration?: number;

  @ApiProperty({ required: false })
  calories?: number;

  @ApiProperty({ enum: ExerciseStatus })
  status: ExerciseStatus;

  @ApiProperty({ required: false })
  metadata?: Record<string, any>;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}

export class ExerciseStatsDto {
  @ApiProperty({ description: '총 운동 세션 수' })
  totalSessions: number;

  @ApiProperty({ description: '총 운동 시간(초)' })
  totalDuration: number;

  @ApiProperty({ description: '총 소모 칼로리' })
  totalCalories: number;

  @ApiProperty({ description: '평균 운동 시간(초)' })
  averageDuration: number;

  @ApiProperty({ enum: ExerciseType, description: '가장 많이 한 운동 유형', required: false })
  mostFrequentType: ExerciseType | null;
}

export class ExerciseSessionsResponseDto {
  @ApiProperty({ type: [ExerciseSessionResponseDto] })
  sessions: ExerciseSessionResponseDto[];

  @ApiProperty({ description: '전체 세션 수' })
  total: number;
} 