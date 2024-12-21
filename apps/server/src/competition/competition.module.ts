import { Module } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [CompetitionService],
  exports: [CompetitionService],
})
export class CompetitionModule {} 