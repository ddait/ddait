import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { CreateCompetitionDto, UpdateScoreDto } from './dto/competition.dto';

@Controller('competition')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @Post('match')
  async startMatch(
    @Query('userId') userId: string,
    @Body() createDto: CreateCompetitionDto
  ) {
    return this.competitionService.startMatching(userId, createDto);
  }

  @Get('matches')
  async getMatches(
    @Query('userId') userId: string,
    @Query('status') status: string,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    return this.competitionService.getMatches(userId, { status, page, limit });
  }

  @Get('matches/:matchId')
  async getMatch(
    @Param('matchId') matchId: string,
    @Query('userId') userId: string
  ) {
    return this.competitionService.getMatch(userId, matchId);
  }

  @Post('matches/:matchId/score')
  async updateScore(
    @Param('matchId') matchId: string,
    @Query('userId') userId: string,
    @Body() updateDto: UpdateScoreDto
  ) {
    return this.competitionService.updateScore(userId, matchId, updateDto);
  }

  @Get('stats')
  async getStats(
    @Query('userId') userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ) {
    return this.competitionService.getStats(userId, { startDate, endDate });
  }
} 