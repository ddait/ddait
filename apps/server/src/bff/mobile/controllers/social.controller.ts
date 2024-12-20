import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../auth/auth.guard';

@Controller('mobile/social')
@UseGuards(AuthGuard)
export class MobileSocialController {
  @Get('friends')
  async getFriends() {
    // 모바일에 최적화된 친구 목록
    return {
      success: true,
      data: {
        friends: [
          {
            id: 'friend-1',
            name: 'Friend 1',
            status: 'online',
            lastActive: new Date()
          }
        ],
        meta: {
          total: 1,
          online: 1
        }
      }
    };
  }

  @Post('friends/add')
  async addFriend(@Body() friendDto: any) {
    // 모바일에 최적화된 친구 추가
    return {
      success: true,
      data: {
        friendId: friendDto.friendId,
        status: 'pending'
      }
    };
  }

  @Get('feed')
  async getFeed() {
    // 모바일에 최적화된 피드
    return {
      success: true,
      data: {
        posts: [
          {
            id: 'post-1',
            userId: 'user-1',
            userName: 'User 1',
            content: 'Exercise post',
            type: 'exercise',
            timestamp: new Date()
          }
        ],
        meta: {
          hasMore: false,
          lastId: 'post-1'
        }
      }
    };
  }

  @Post('feed/post')
  async createPost(@Body() postDto: any) {
    // 모바일에 최적화된 포스트 생성
    return {
      success: true,
      data: {
        id: 'new-post-id',
        timestamp: new Date()
      }
    };
  }
} 