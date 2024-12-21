import { Body, Controller, Get, Post, Patch, Param, UseGuards, Headers } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { CreateCompetitionDto, UpdateCompetitionDto, MatchRequestDto } from './dto/competition.dto';

@Controller('competition')
@UseGuards(AuthGuard)
export class CompetitionController {
  constructor(
    private readonly competitionService: CompetitionService,
    private readonly authService: AuthService
  ) {}

  @Post()
  async createCompetition(
    @Headers('authorization') token: string,
    @Body() createCompetitionDto: CreateCompetitionDto
  ) {
    const user = await this.authService.validateToken(token);
    return this.competitionService.createCompetition(user.id, createCompetitionDto);
  }

  @Get(':id')
  async getCompetition(
    @Headers('authorization') token: string,
    @Param('id') competitionId: string
  ) {
    await this.authService.validateToken(token);
    return this.competitionService.getCompetition(competitionId);
  }

  @Patch(':id')
  async updateCompetition(
    @Headers('authorization') token: string,
    @Param('id') competitionId: string,
    @Body() updateCompetitionDto: UpdateCompetitionDto
  ) {
    const user = await this.authService.validateToken(token);
    return this.competitionService.updateCompetition(competitionId, user.id, updateCompetitionDto);
  }

  @Post('match')
  async findMatch(
    @Headers('authorization') token: string,
    @Body() matchRequestDto: MatchRequestDto
  ) {
    const user = await this.authService.validateToken(token);
    return this.competitionService.findMatch(user.id, matchRequestDto);
  }

  @Get()
  async getUserCompetitions(@Headers('authorization') token: string) {
    const user = await this.authService.validateToken(token);
    return this.competitionService.getUserCompetitions(user.id);
  }

  @Get('stats')
  async getCompetitionStats(@Headers('authorization') token: string) {
    const user = await this.authService.validateToken(token);
    return this.competitionService.getCompetitionStats(user.id);
  }
} 