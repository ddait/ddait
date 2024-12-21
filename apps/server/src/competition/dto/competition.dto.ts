import { IsString, IsNumber, IsOptional, IsEnum, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExerciseType } from '../../exercise/dto/exercise.dto';

export enum CompetitionType {
  ONE_VS_ONE = '1v1',
  GROUP = 'group',
  PAST_RECORD = 'past_record'
}

export enum CompetitionStatus {
  WAITING = 'waiting',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export class CreateCompetitionDto {
  @ApiProperty({ enum: CompetitionType })
  @IsEnum(CompetitionType)
  type: CompetitionType;

  @ApiProperty({ enum: ExerciseType })
  @IsEnum(ExerciseType)
  exerciseType: ExerciseType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  maxParticipants?: number;
}

export class UpdateCompetitionDto {
  @ApiProperty({ enum: CompetitionStatus, required: false })
  @IsOptional()
  @IsEnum(CompetitionStatus)
  status?: CompetitionStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  score?: number;
}

export class CompetitionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: CompetitionType })
  type: CompetitionType;

  @ApiProperty({ enum: CompetitionStatus })
  status: CompetitionStatus;

  @ApiProperty({ enum: ExerciseType })
  exerciseType: ExerciseType;

  @ApiProperty()
  startTime: Date;

  @ApiProperty({ required: false })
  endTime?: Date;

  @ApiProperty()
  maxParticipants: number;

  @ApiProperty()
  currentParticipants: number;

  @ApiProperty({ type: [String] })
  participants: string[];

  @ApiProperty({ type: Object })
  scores: Record<string, number>;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class MatchRequestDto {
  @ApiProperty({ enum: CompetitionType })
  @IsEnum(CompetitionType)
  type: CompetitionType;

  @ApiProperty({ enum: ExerciseType })
  @IsEnum(ExerciseType)
  exerciseType: ExerciseType;
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