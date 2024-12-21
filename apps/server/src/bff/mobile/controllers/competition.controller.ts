import { Controller, Post, Get, Body, Param, Headers, UseGuards, Query } from '@nestjs/common';
import { CompetitionService } from '../../../competition/competition.service';
import { CreateCompetitionDto, UpdateScoreDto } from '../../../competition/dto/competition.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('mobile/competition')
export class MobileCompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @UseGuards(AuthGuard)
  @Post('match')
  async startMatch(
    @Headers('authorization') token: string,
    @Body() createDto: CreateCompetitionDto
  ) {
    const userId = token.split(' ')[1];
    return this.competitionService.startMatching(userId, createDto);
  }

  @UseGuards(AuthGuard)
  @Get('matches')
  async getMatches(
    @Headers('authorization') token: string,
    @Query('status') status: string,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    const userId = token.split(' ')[1];
    return this.competitionService.getMatches(userId, { status, page, limit });
  }

  @UseGuards(AuthGuard)
  @Get('matches/:matchId')
  async getMatch(
    @Headers('authorization') token: string,
    @Param('matchId') matchId: string
  ) {
    const userId = token.split(' ')[1];
    return this.competitionService.getMatch(userId, matchId);
  }

  @UseGuards(AuthGuard)
  @Post('matches/:matchId/score')
  async updateScore(
    @Headers('authorization') token: string,
    @Param('matchId') matchId: string,
    @Body() updateDto: UpdateScoreDto
  ) {
    const userId = token.split(' ')[1];
    return this.competitionService.updateScore(userId, matchId, updateDto);
  }

  @UseGuards(AuthGuard)
  @Get('stats')
  async getStats(
    @Headers('authorization') token: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ) {
    const userId = token.split(' ')[1];
    return this.competitionService.getStats(userId, { startDate, endDate });
  }
} 