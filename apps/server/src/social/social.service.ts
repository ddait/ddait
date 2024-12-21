import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreatePostDto, UpdatePostDto, FriendDto, FriendshipStatus } from './dto/social.dto';

@Injectable()
export class SocialService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getFriends(userId: string, options: { status?: string; page: number; limit: number }) {
    const { status, page, limit } = options;
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    let query = this.supabaseService
      .from('friendships')
      .select('*, profiles!inner(*)')
      .or(`user_id.eq.${userId},friend_id.eq.${userId}`);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(start, end);

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return {
      friends: data.map((friendship) => ({
        id: friendship.id,
        userId: friendship.user_id === userId ? friendship.friend_id : friendship.user_id,
        username: friendship.profiles.username,
        status: friendship.status,
        createdAt: friendship.created_at,
      })),
      total: count,
      page,
      limit,
    };
  }

  async addFriend(userId: string, friendDto: FriendDto) {
    // Check if friendship already exists
    const { data: existing, error: checkError } = await this.supabaseService
      .from('friendships')
      .select('*')
      .or(`and(user_id.eq.${userId},friend_id.eq.${friendDto.friendId}),and(user_id.eq.${friendDto.friendId},friend_id.eq.${userId})`)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw new UnauthorizedException(checkError.message);
    }

    if (existing) {
      throw new UnauthorizedException('Friendship already exists');
    }

    // Create new friendship
    const { data, error } = await this.supabaseService
      .from('friendships')
      .insert({
        user_id: userId,
        friend_id: friendDto.friendId,
        status: FriendshipStatus.PENDING,
        message: friendDto.message,
      })
      .select()
      .single();

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return data;
  }

  async acceptFriend(userId: string, friendId: string) {
    const { data, error } = await this.supabaseService
      .from('friendships')
      .update({ status: FriendshipStatus.ACCEPTED })
      .eq('friend_id', userId)
      .eq('user_id', friendId)
      .eq('status', FriendshipStatus.PENDING)
      .select()
      .single();

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    if (!data) {
      throw new NotFoundException('Friend request not found');
    }

    return data;
  }

  async removeFriend(userId: string, friendId: string) {
    const { error } = await this.supabaseService
      .from('friendships')
      .delete()
      .or(`and(user_id.eq.${userId},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${userId})`);

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return { message: 'Friend removed successfully' };
  }

  async getFeed(userId: string, options: { page: number; limit: number }) {
    const { page, limit } = options;
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    // Get user's friends
    const { data: friends, error: friendsError } = await this.supabaseService
      .from('friendships')
      .select('user_id, friend_id')
      .or(`user_id.eq.${userId},friend_id.eq.${userId}`)
      .eq('status', FriendshipStatus.ACCEPTED);

    if (friendsError) {
      throw new UnauthorizedException(friendsError.message);
    }

    // Create array of friend IDs
    const friendIds = friends.map((f) =>
      f.user_id === userId ? f.friend_id : f.user_id
    );

    // Get posts from user and friends
    const { data, error, count } = await this.supabaseService
      .from('posts')
      .select('*, profiles!inner(*)', { count: 'exact' })
      .in('user_id', [userId, ...friendIds])
      .order('created_at', { ascending: false })
      .range(start, end);

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return {
      posts: data,
      total: count,
      page,
      limit,
    };
  }

  async createPost(userId: string, createDto: CreatePostDto) {
    const { data, error } = await this.supabaseService
      .from('posts')
      .insert({
        user_id: userId,
        ...createDto,
      })
      .select()
      .single();

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return data;
  }

  async updatePost(userId: string, postId: string, updateDto: UpdatePostDto) {
    const { data, error } = await this.supabaseService
      .from('posts')
      .update(updateDto)
      .eq('id', postId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    if (!data) {
      throw new NotFoundException('Post not found');
    }

    return data;
  }

  async deletePost(userId: string, postId: string) {
    const { error } = await this.supabaseService
      .from('posts')
      .delete()
      .eq('id', postId)
      .eq('user_id', userId);

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return { message: 'Post deleted successfully' };
  }

  async getNotifications(userId: string, options: { page: number; limit: number }) {
    const { page, limit } = options;
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const { data, error, count } = await this.supabaseService
      .from('notifications')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(start, end);

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return {
      notifications: data,
      total: count,
      page,
      limit,
    };
  }

  async markNotificationAsRead(userId: string, notificationId: string) {
    const { data, error } = await this.supabaseService
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    if (!data) {
      throw new NotFoundException('Notification not found');
    }

    return data;
  }
} 