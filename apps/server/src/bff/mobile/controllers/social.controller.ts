import { Controller, Get, Post, Put, Delete, Body, Param, Headers, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../../../auth/auth.guard';
import { AuthService } from '../../../auth/auth.service';
import { SocialService } from '../../../social/social.service';
import { CreatePostDto, UpdatePostDto, FriendDto } from '../../../social/dto/social.dto';

@ApiTags('Mobile Social')
@Controller('mobile/social')
export class MobileSocialController {
  constructor(
    private readonly authService: AuthService,
    private readonly socialService: SocialService
  ) {}

  @Get('friends')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user friends' })
  @ApiResponse({ status: 200, description: 'Friends retrieved' })
  async getFriends(
    @Headers('authorization') token: string,
    @Query('status') status?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    const user = await this.authService.validateToken(token);
    return this.socialService.getFriends(user.id, { status, page, limit });
  }

  @Post('friends')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Add friend' })
  @ApiResponse({ status: 201, description: 'Friend request sent' })
  async addFriend(
    @Headers('authorization') token: string,
    @Body() friendDto: FriendDto
  ) {
    const user = await this.authService.validateToken(token);
    return this.socialService.addFriend(user.id, friendDto);
  }

  @Put('friends/:id/accept')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Accept friend request' })
  @ApiResponse({ status: 200, description: 'Friend request accepted' })
  async acceptFriend(
    @Headers('authorization') token: string,
    @Param('id') friendId: string
  ) {
    const user = await this.authService.validateToken(token);
    return this.socialService.acceptFriend(user.id, friendId);
  }

  @Delete('friends/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Remove friend' })
  @ApiResponse({ status: 200, description: 'Friend removed' })
  async removeFriend(
    @Headers('authorization') token: string,
    @Param('id') friendId: string
  ) {
    const user = await this.authService.validateToken(token);
    return this.socialService.removeFriend(user.id, friendId);
  }

  @Get('feed')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get social feed' })
  @ApiResponse({ status: 200, description: 'Feed retrieved' })
  async getFeed(
    @Headers('authorization') token: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    const user = await this.authService.validateToken(token);
    return this.socialService.getFeed(user.id, { page, limit });
  }

  @Post('posts')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({ status: 201, description: 'Post created' })
  async createPost(
    @Headers('authorization') token: string,
    @Body() createDto: CreatePostDto
  ) {
    const user = await this.authService.validateToken(token);
    return this.socialService.createPost(user.id, createDto);
  }

  @Put('posts/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update post' })
  @ApiResponse({ status: 200, description: 'Post updated' })
  async updatePost(
    @Headers('authorization') token: string,
    @Param('id') postId: string,
    @Body() updateDto: UpdatePostDto
  ) {
    const user = await this.authService.validateToken(token);
    return this.socialService.updatePost(user.id, postId, updateDto);
  }

  @Delete('posts/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete post' })
  @ApiResponse({ status: 200, description: 'Post deleted' })
  async deletePost(
    @Headers('authorization') token: string,
    @Param('id') postId: string
  ) {
    const user = await this.authService.validateToken(token);
    return this.socialService.deletePost(user.id, postId);
  }

  @Get('notifications')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get notifications' })
  @ApiResponse({ status: 200, description: 'Notifications retrieved' })
  async getNotifications(
    @Headers('authorization') token: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    const user = await this.authService.validateToken(token);
    return this.socialService.getNotifications(user.id, { page, limit });
  }

  @Put('notifications/:id/read')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiResponse({ status: 200, description: 'Notification marked as read' })
  async markNotificationAsRead(
    @Headers('authorization') token: string,
    @Param('id') notificationId: string
  ) {
    const user = await this.authService.validateToken(token);
    return this.socialService.markNotificationAsRead(user.id, notificationId);
  }
} 