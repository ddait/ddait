import { IsString, IsNumber, IsEnum, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum CompetitionType {
  SOLO = 'SOLO',
  TEAM = 'TEAM',
  TOURNAMENT = 'TOURNAMENT',
}

export enum CompetitionStatus {
  WAITING = 'WAITING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class CreateCompetitionDto {
  @ApiProperty({ enum: CompetitionType })
  @IsEnum(CompetitionType)
  type: CompetitionType;

  @ApiProperty({ example: 'RUNNING' })
  @IsString()
  exerciseType: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(2)
  @Max(100)
  maxParticipants?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  durationMinutes?: number;
}

export class UpdateScoreDto {
  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0)
  score: number;
}

export class CompetitionStatsDto {
  @ApiProperty()
  totalMatches: number;

  @ApiProperty()
  wins: number;

  @ApiProperty()
  losses: number;

  @ApiProperty()
  draws: number;

  @ApiProperty()
  winRate: number;

  @ApiProperty()
  totalScore: number;

  @ApiProperty()
  averageScore: number;
}

export class LeaderboardEntryDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  score: number;

  @ApiProperty()
  matchCount: number;
}

export class LeaderboardResponseDto {
  @ApiProperty({ type: [LeaderboardEntryDto] })
  rankings: LeaderboardEntryDto[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
} 