import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExerciseType } from '../../exercise/dto/exercise.dto';

export enum CompetitionType {
  ONE_ON_ONE = '1v1',
  GROUP = 'group',
  RANKING = 'ranking'
}

export enum CompetitionStatus {
  WAITING = 'waiting',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export class CreateCompetitionDto {
  @ApiProperty({
    enum: CompetitionType,
    example: CompetitionType.ONE_ON_ONE,
    description: '경쟁 유형'
  })
  @IsEnum(CompetitionType)
  type: CompetitionType;

  @ApiProperty({
    enum: ExerciseType,
    example: ExerciseType.WEIGHT,
    description: '운동 유형'
  })
  @IsEnum(ExerciseType)
  exerciseType: ExerciseType;

  @ApiProperty({
    example: 2,
    description: '최대 참가자 수',
    required: false
  })
  @IsOptional()
  @IsNumber()
  maxParticipants?: number;
}

export class UpdateScoreDto {
  @ApiProperty({
    example: 100,
    description: '점수'
  })
  @IsNumber()
  score: number;

  @ApiProperty({
    example: { reps: 10, weight: 100 },
    description: '세부 기록',
    required: false
  })
  @IsOptional()
  details?: Record<string, any>;
}

export class CompetitionResponseDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ enum: CompetitionType })
  type: CompetitionType;

  @ApiProperty({ enum: ExerciseType })
  exerciseType: ExerciseType;

  @ApiProperty({ enum: CompetitionStatus })
  status: CompetitionStatus;

  @ApiProperty({ example: 2 })
  maxParticipants: number;

  @ApiProperty({ example: 1 })
  currentParticipants: number;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  startTime: Date;

  @ApiProperty({ example: '2024-01-01T01:00:00Z', required: false })
  endTime?: Date;

  @ApiProperty({
    example: {
      'user1': 100,
      'user2': 80
    }
  })
  scores: Record<string, number>;
}

export class LeaderboardEntryDto {
  @ApiProperty({ example: '1' })
  userId: string;

  @ApiProperty({ example: 'John Doe' })
  username: string;

  @ApiProperty({ example: 1000 })
  score: number;

  @ApiProperty({ example: 1 })
  rank: number;

  @ApiProperty({ example: 10 })
  totalMatches: number;

  @ApiProperty({ example: 8 })
  wins: number;
}

export class CompetitionStatsDto {
  @ApiProperty()
  totalCompetitions: number;

  @ApiProperty()
  wins: number;

  @ApiProperty()
  losses: number;

  @ApiProperty()
  draws: number;

  @ApiProperty()
  winRate: number;

  @ApiProperty({ type: Object })
  typeStats: Record<CompetitionType, {
    total: number;
    wins: number;
    winRate: number;
  }>;
} 