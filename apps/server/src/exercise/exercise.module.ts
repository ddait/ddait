import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [ExerciseService],
  exports: [ExerciseService],
})
export class ExerciseModule {} 