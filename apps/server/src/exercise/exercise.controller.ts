import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ExerciseService } from './exercise.service';
import { CreateSessionDto, UpdateSessionDto } from './dto/exercise.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('운동 세션')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @ApiOperation({ summary: '운동 세션 생성' })
  @ApiResponse({ status: 201, description: '운동 세션 생성 성공' })
  @Post('sessions')
  async createSession(
    @Headers('authorization') token: string,
    @Body() createDto: CreateSessionDto
  ) {
    const userId = token.split(' ')[1];
    return this.exerciseService.createSession(userId, createDto);
  }

  @ApiOperation({ summary: '운동 세션 조회' })
  @ApiResponse({ status: 200, description: '운동 세션 조회 성공' })
  @Get('sessions/:id')
  async getSession(
    @Headers('authorization') token: string,
    @Param('id') sessionId: string
  ) {
    const userId = token.split(' ')[1];
    return this.exerciseService.getSession(sessionId);
  }

  @ApiOperation({ summary: '운동 세션 수정' })
  @ApiResponse({ status: 200, description: '운동 세션 수정 성공' })
  @Put('sessions/:id')
  async updateSession(
    @Headers('authorization') token: string,
    @Param('id') sessionId: string,
    @Body() updateDto: UpdateSessionDto
  ) {
    const userId = token.split(' ')[1];
    return this.exerciseService.updateSession(sessionId, updateDto);
  }

  @ApiOperation({ summary: '운동 세션 삭제' })
  @ApiResponse({ status: 200, description: '운동 세션 삭제 성공' })
  @Delete('sessions/:id')
  async deleteSession(
    @Headers('authorization') token: string,
    @Param('id') sessionId: string
  ) {
    const userId = token.split(' ')[1];
    return this.exerciseService.deleteSession(sessionId);
  }

  @ApiOperation({ summary: '운동 통계 조회' })
  @ApiResponse({ status: 200, description: '운동 통계 조회 성공' })
  @Get('stats')
  async getStats(@Headers('authorization') token: string) {
    const userId = token.split(' ')[1];
    return this.exerciseService.getStats(userId);
  }
} 