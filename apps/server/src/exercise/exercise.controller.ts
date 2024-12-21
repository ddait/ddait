import { Body, Controller, Get, Post, Patch, Param, UseGuards, Headers } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { CreateSessionDto, UpdateSessionDto } from './dto/exercise.dto';

@Controller('exercise')
@UseGuards(AuthGuard)
export class ExerciseController {
  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly authService: AuthService
  ) {}

  @Post('sessions')
  async createSession(
    @Headers('authorization') token: string,
    @Body() createSessionDto: CreateSessionDto
  ) {
    const user = await this.authService.validateToken(token);
    return this.exerciseService.createSession(user.id, createSessionDto);
  }

  @Get('sessions/:id')
  async getSession(
    @Headers('authorization') token: string,
    @Param('id') sessionId: string
  ) {
    await this.authService.validateToken(token);
    return this.exerciseService.getSession(sessionId);
  }

  @Patch('sessions/:id')
  async updateSession(
    @Headers('authorization') token: string,
    @Param('id') sessionId: string,
    @Body() updateSessionDto: UpdateSessionDto
  ) {
    await this.authService.validateToken(token);
    return this.exerciseService.updateSession(sessionId, updateSessionDto);
  }

  @Get('sessions')
  async getUserSessions(@Headers('authorization') token: string) {
    const user = await this.authService.validateToken(token);
    return this.exerciseService.getUserSessions(user.id);
  }

  @Get('stats')
  async getSessionStats(@Headers('authorization') token: string) {
    const user = await this.authService.validateToken(token);
    return this.exerciseService.getSessionStats(user.id);
  }
} 