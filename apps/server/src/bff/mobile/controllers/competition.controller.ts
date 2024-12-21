import { Controller, Get, Post, Put, Body, Param, Headers, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../../../auth/auth.guard';
import { AuthService } from '../../../auth/auth.service';
import { CompetitionService } from '../../../competition/competition.service';
import { CreateCompetitionDto, UpdateScoreDto } from '../../../competition/dto/competition.dto';

@ApiTags('Mobile Competition')
@Controller('mobile/competition')
export class MobileCompetitionController {
  constructor(
    private readonly authService: AuthService,
    private readonly competitionService: CompetitionService
  ) {}

  @Post('matches')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Find a match' })
  @ApiResponse({ status: 201, description: 'Match found' })
  async findMatch(
    @Headers('authorization') token: string,
    @Body() createDto: CreateCompetitionDto
  ) {
    const user = await this.authService.validateToken(token);
    return this.competitionService.findMatch(user.id, createDto);
  }

  @Get('matches')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user matches' })
  @ApiResponse({ status: 200, description: 'Matches retrieved' })
  async getMatches(
    @Headers('authorization') token: string,
    @Query('status') status?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    const user = await this.authService.validateToken(token);
    return this.competitionService.getMatches(user.id, { status, page, limit });
  }

  @Get('matches/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get match details' })
  @ApiResponse({ status: 200, description: 'Match details retrieved' })
  async getMatch(
    @Headers('authorization') token: string,
    @Param('id') matchId: string
  ) {
    const user = await this.authService.validateToken(token);
    return this.competitionService.getMatch(user.id, matchId);
  }

  @Put('matches/:id/score')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update match score' })
  @ApiResponse({ status: 200, description: 'Score updated' })
  async updateScore(
    @Headers('authorization') token: string,
    @Param('id') matchId: string,
    @Body() updateDto: UpdateScoreDto
  ) {
    const user = await this.authService.validateToken(token);
    return this.competitionService.updateScore(user.id, matchId, updateDto);
  }

  @Get('leaderboard')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get leaderboard' })
  @ApiResponse({ status: 200, description: 'Leaderboard retrieved' })
  async getLeaderboard(
    @Headers('authorization') token: string,
    @Query('timeRange') timeRange: string = 'week',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    await this.authService.validateToken(token);
    return this.competitionService.getLeaderboard({ timeRange, page, limit });
  }

  @Get('stats')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get competition statistics' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved' })
  async getStats(
    @Headers('authorization') token: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ) {
    const user = await this.authService.validateToken(token);
    return this.competitionService.getStats(user.id, { startDate, endDate });
  }
} 