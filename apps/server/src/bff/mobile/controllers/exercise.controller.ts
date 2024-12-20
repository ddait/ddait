import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../auth/auth.guard';

@Controller('mobile/exercise')
@UseGuards(AuthGuard)
export class MobileExerciseController {
  @Post('sessions')
  async createSession(@Body() sessionDto: any) {
    // 모바일에 최적화된 운동 세션 생성
    return {
      success: true,
      data: {
        id: 'session-id',
        type: sessionDto.type,
        startTime: new Date(),
        status: 'active'
      }
    };
  }

  @Get('sessions/:id')
  async getSession(@Param('id') id: string) {
    // 모바일에 최적화된 운동 세션 조회
    return {
      success: true,
      data: {
        id,
        type: 'running',
        duration: 1800, // 30분
        calories: 250,
        status: 'completed'
      }
    };
  }

  @Get('sessions')
  async getSessions() {
    // 모바일에 최적화된 운동 세션 목록
    return {
      success: true,
      data: {
        sessions: [
          {
            id: 'session-1',
            type: 'running',
            duration: 1800,
            calories: 250
          }
        ],
        // 모바일에서 필요한 최소한의 메타데이터
        meta: {
          total: 1,
          hasMore: false
        }
      }
    };
  }
} 