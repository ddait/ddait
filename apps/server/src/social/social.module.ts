import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [SocialService],
  exports: [SocialService],
})
export class SocialModule {} 