import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateCompetitionDto, UpdateScoreDto } from './dto/competition.dto';

@Injectable()
export class CompetitionService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findMatch(userId: string, createDto: CreateCompetitionDto) {
    // First, check if there's an available match
    const { data: existingMatch, error: searchError } = await this.supabaseService
      .from('competitions')
      .select('*')
      .eq('status', 'WAITING')
      .eq('type', createDto.type)
      .neq('creator_id', userId)
      .single();

    if (searchError && searchError.code !== 'PGRST116') {
      throw new UnauthorizedException(searchError.message);
    }

    if (existingMatch) {
      // Join existing match
      const { error: joinError } = await this.supabaseService
        .from('competition_participants')
        .insert({
          competition_id: existingMatch.id,
          user_id: userId,
          status: 'JOINED',
        });

      if (joinError) {
        throw new UnauthorizedException(joinError.message);
      }

      return existingMatch;
    }

    // Create new match if no existing match found
    const { data: newMatch, error: createError } = await this.supabaseService
      .from('competitions')
      .insert({
        creator_id: userId,
        type: createDto.type,
        status: 'WAITING',
        ...createDto,
      })
      .select()
      .single();

    if (createError) {
      throw new UnauthorizedException(createError.message);
    }

    // Add creator as participant
    const { error: participantError } = await this.supabaseService
      .from('competition_participants')
      .insert({
        competition_id: newMatch.id,
        user_id: userId,
        status: 'JOINED',
      });

    if (participantError) {
      throw new UnauthorizedException(participantError.message);
    }

    return newMatch;
  }

  async getMatches(userId: string, options: { status?: string; page: number; limit: number }) {
    const { status, page, limit } = options;
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    let query = this.supabaseService
      .from('competitions')
      .select('*, competition_participants!inner(*)')
      .eq('competition_participants.user_id', userId);

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
      matches: data,
      total: count,
      page,
      limit,
    };
  }

  async getMatch(userId: string, matchId: string) {
    const { data, error } = await this.supabaseService
      .from('competitions')
      .select('*, competition_participants(*)')
      .eq('id', matchId)
      .single();

    if (error) {
      throw new NotFoundException('Match not found');
    }

    const isParticipant = data.competition_participants.some(
      (p) => p.user_id === userId
    );

    if (!isParticipant) {
      throw new UnauthorizedException('Not a participant of this match');
    }

    return data;
  }

  async updateScore(userId: string, matchId: string, updateDto: UpdateScoreDto) {
    // First check if user is a participant
    const { data: participant, error: participantError } = await this.supabaseService
      .from('competition_participants')
      .select('*')
      .eq('competition_id', matchId)
      .eq('user_id', userId)
      .single();

    if (participantError || !participant) {
      throw new UnauthorizedException('Not a participant of this match');
    }

    // Update score
    const { data, error } = await this.supabaseService
      .from('competition_participants')
      .update({ score: updateDto.score })
      .eq('competition_id', matchId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return data;
  }

  async getLeaderboard(options: { timeRange: 'day' | 'week' | 'month'; page: number; limit: number }) {
    const { timeRange, page, limit } = options;
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    let startDate: Date;
    const now = new Date();

    switch (timeRange) {
      case 'day':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
    }

    const { data, error, count } = await this.supabaseService
      .from('competition_participants')
      .select('*, competitions!inner(*), profiles!inner(*)', { count: 'exact' })
      .gte('competitions.created_at', startDate.toISOString())
      .order('score', { ascending: false })
      .range(start, end);

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return {
      rankings: data.map((item) => ({
        userId: item.user_id,
        username: item.profiles.username,
        score: item.score,
        matchCount: item.match_count,
      })),
      total: count,
      page,
      limit,
    };
  }

  async getStats(userId: string, options: { startDate: string; endDate: string }) {
    const { startDate, endDate } = options;

    const { data, error } = await this.supabaseService
      .from('competition_participants')
      .select('*, competitions!inner(*)')
      .eq('user_id', userId)
      .gte('competitions.created_at', startDate)
      .lte('competitions.created_at', endDate);

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    // Calculate statistics
    const totalMatches = data.length;
    const wins = data.filter((match) => match.result === 'WIN').length;
    const losses = data.filter((match) => match.result === 'LOSS').length;
    const draws = data.filter((match) => match.result === 'DRAW').length;
    const totalScore = data.reduce((sum, match) => sum + (match.score || 0), 0);
    const averageScore = totalMatches > 0 ? totalScore / totalMatches : 0;

    return {
      totalMatches,
      wins,
      losses,
      draws,
      winRate: totalMatches > 0 ? (wins / totalMatches) * 100 : 0,
      totalScore,
      averageScore,
    };
  }
} 