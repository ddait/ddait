import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateExerciseSessionDto, UpdateExerciseSessionDto } from './dto/exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createSession(userId: string, createDto: CreateExerciseSessionDto) {
    const { data, error } = await this.supabaseService
      .from('exercise_sessions')
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

  async getSessions(userId: string, options: { page: number; limit: number }) {
    const { page, limit } = options;
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const { data, error, count } = await this.supabaseService
      .from('exercise_sessions')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(start, end);

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return {
      sessions: data,
      total: count,
      page,
      limit,
    };
  }

  async getSession(userId: string, sessionId: string) {
    const { data, error } = await this.supabaseService
      .from('exercise_sessions')
      .select('*')
      .eq('id', sessionId)
      .eq('user_id', userId)
      .single();

    if (error) {
      throw new NotFoundException('Exercise session not found');
    }

    return data;
  }

  async updateSession(userId: string, sessionId: string, updateDto: UpdateExerciseSessionDto) {
    const { data, error } = await this.supabaseService
      .from('exercise_sessions')
      .update(updateDto)
      .eq('id', sessionId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return data;
  }

  async deleteSession(userId: string, sessionId: string) {
    const { error } = await this.supabaseService
      .from('exercise_sessions')
      .delete()
      .eq('id', sessionId)
      .eq('user_id', userId);

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return { message: 'Exercise session deleted successfully' };
  }

  async getStats(userId: string, options: { startDate: string; endDate: string }) {
    const { startDate, endDate } = options;

    const { data, error } = await this.supabaseService
      .from('exercise_sessions')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate)
      .lte('created_at', endDate);

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    // Calculate statistics
    const totalSessions = data.length;
    const totalDuration = data.reduce((sum, session) => sum + (session.duration || 0), 0);
    const totalCalories = data.reduce((sum, session) => sum + (session.calories || 0), 0);
    const averageDuration = totalSessions > 0 ? totalDuration / totalSessions : 0;

    // Find most frequent exercise type
    const typeCount = data.reduce((acc, session) => {
      acc[session.exercise_type] = (acc[session.exercise_type] || 0) + 1;
      return acc;
    }, {});
    const mostFrequentType = Object.entries(typeCount).reduce((a, b) => (a[1] > b[1] ? a : b))[0];

    return {
      totalSessions,
      totalDuration,
      totalCalories,
      averageDuration,
      mostFrequentType,
    };
  }

  async getTemplates(category?: string) {
    const query = this.supabaseService
      .from('exercise_templates')
      .select('*')
      .eq('is_active', true);

    if (category) {
      query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return data;
  }
} 