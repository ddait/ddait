import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../auth/auth.guard';

@Controller('mobile/competition')
@UseGuards(AuthGuard)
export class MobileCompetitionController {
  @Post('match')
  async findMatch(@Body() matchDto: any) {
    // 모바일에 최적화된 매칭 응답
    return {
      success: true,
      data: {
        matchId: 'match-id',
        status: 'searching',
        estimatedTime: 30 // 예상 대기 시간(초)
      }
    };
  }

  @Get('match/:id')
  async getMatchStatus(@Param('id') id: string) {
    // 모바일에 최적화된 매칭 상태 조회
    return {
      success: true,
      data: {
        matchId: id,
        status: 'matched',
        opponent: {
          id: 'opponent-id',
          name: 'Opponent',
          level: 5
        }
      }
    };
  }

  @Post('score')
  async updateScore(@Body() scoreDto: any) {
    // 모바일에 최적화된 점수 업데이트
    return {
      success: true,
      data: {
        currentScore: scoreDto.score,
        rank: 1,
        totalParticipants: 2
      }
    };
  }

  @Get('leaderboard')
  async getLeaderboard() {
    // 모바일에 최적화된 리더보드
    return {
      success: true,
      data: {
        rankings: [
          {
            rank: 1,
            userId: 'user-1',
            name: 'User 1',
            score: 100
          }
        ],
        // 모바일에 필요한 최소한의 메타데이터
        meta: {
          total: 1,
          userRank: 1
        }
      }
    };
  }
} 