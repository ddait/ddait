import { Controller, Get, Post, Put, Delete, Body, Param, Headers, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../../../auth/auth.guard';
import { AuthService } from '../../../auth/auth.service';
import { ExerciseService } from '../../../exercise/exercise.service';
import { CreateExerciseSessionDto, UpdateExerciseSessionDto } from '../../../exercise/dto/exercise.dto';

@ApiTags('Mobile Exercise')
@Controller('mobile/exercise')
export class MobileExerciseController {
  constructor(
    private readonly authService: AuthService,
    private readonly exerciseService: ExerciseService
  ) {}

  @Post('sessions')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new exercise session' })
  @ApiResponse({ status: 201, description: 'Exercise session created' })
  async createSession(
    @Headers('authorization') token: string,
    @Body() createDto: CreateExerciseSessionDto
  ) {
    const user = await this.authService.validateToken(token);
    return this.exerciseService.createSession(user.id, createDto);
  }

  @Get('sessions')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get exercise sessions' })
  @ApiResponse({ status: 200, description: 'Exercise sessions retrieved' })
  async getSessions(
    @Headers('authorization') token: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    const user = await this.authService.validateToken(token);
    return this.exerciseService.getSessions(user.id, { page, limit });
  }

  @Get('sessions/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get exercise session by ID' })
  @ApiResponse({ status: 200, description: 'Exercise session retrieved' })
  async getSession(
    @Headers('authorization') token: string,
    @Param('id') sessionId: string
  ) {
    const user = await this.authService.validateToken(token);
    return this.exerciseService.getSession(user.id, sessionId);
  }

  @Put('sessions/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update exercise session' })
  @ApiResponse({ status: 200, description: 'Exercise session updated' })
  async updateSession(
    @Headers('authorization') token: string,
    @Param('id') sessionId: string,
    @Body() updateDto: UpdateExerciseSessionDto
  ) {
    const user = await this.authService.validateToken(token);
    return this.exerciseService.updateSession(user.id, sessionId, updateDto);
  }

  @Delete('sessions/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete exercise session' })
  @ApiResponse({ status: 200, description: 'Exercise session deleted' })
  async deleteSession(
    @Headers('authorization') token: string,
    @Param('id') sessionId: string
  ) {
    const user = await this.authService.validateToken(token);
    return this.exerciseService.deleteSession(user.id, sessionId);
  }

  @Get('stats')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get exercise statistics' })
  @ApiResponse({ status: 200, description: 'Exercise statistics retrieved' })
  async getStats(
    @Headers('authorization') token: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ) {
    const user = await this.authService.validateToken(token);
    return this.exerciseService.getStats(user.id, { startDate, endDate });
  }

  @Get('templates')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get exercise templates' })
  @ApiResponse({ status: 200, description: 'Exercise templates retrieved' })
  async getTemplates(
    @Headers('authorization') token: string,
    @Query('category') category?: string
  ) {
    await this.authService.validateToken(token);
    return this.exerciseService.getTemplates(category);
  }
} 