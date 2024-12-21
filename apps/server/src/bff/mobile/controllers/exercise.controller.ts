import { Controller, Post, Get, Put, Delete, Body, Param, Headers, UseGuards, Query } from '@nestjs/common';
import { ExerciseService } from '../../../exercise/exercise.service';
import { CreateSessionDto, UpdateSessionDto } from '../../../exercise/dto/exercise.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('mobile/exercise')
export class MobileExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @UseGuards(AuthGuard)
  @Post('sessions')
  async createSession(
    @Headers('authorization') token: string,
    @Body() createDto: CreateSessionDto
  ) {
    const userId = token.split(' ')[1];
    return this.exerciseService.createSession(userId, createDto);
  }

  @UseGuards(AuthGuard)
  @Get('sessions')
  async getSessions(
    @Headers('authorization') token: string,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    const userId = token.split(' ')[1];
    return this.exerciseService.getSessions(userId, { page, limit });
  }

  @UseGuards(AuthGuard)
  @Get('sessions/:sessionId')
  async getSession(
    @Headers('authorization') token: string,
    @Param('sessionId') sessionId: string
  ) {
    const userId = token.split(' ')[1];
    return this.exerciseService.getSession(sessionId);
  }

  @UseGuards(AuthGuard)
  @Put('sessions/:sessionId')
  async updateSession(
    @Headers('authorization') token: string,
    @Param('sessionId') sessionId: string,
    @Body() updateDto: UpdateSessionDto
  ) {
    const userId = token.split(' ')[1];
    return this.exerciseService.updateSession(sessionId, updateDto);
  }

  @UseGuards(AuthGuard)
  @Delete('sessions/:sessionId')
  async deleteSession(
    @Headers('authorization') token: string,
    @Param('sessionId') sessionId: string
  ) {
    const userId = token.split(' ')[1];
    return this.exerciseService.deleteSession(sessionId);
  }

  @UseGuards(AuthGuard)
  @Get('stats')
  async getStats(
    @Headers('authorization') token: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ) {
    const userId = token.split(' ')[1];
    return this.exerciseService.getStats(userId);
  }

  @UseGuards(AuthGuard)
  @Get('templates')
  async getTemplates(@Query('category') category: string) {
    return this.exerciseService.getTemplates(category);
  }
} 