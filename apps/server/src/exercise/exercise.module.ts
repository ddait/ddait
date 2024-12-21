import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { AuthModule } from '../auth/auth.module';
import { MockModule } from '../common/mock/mock.module';

@Module({
  imports: [AuthModule, MockModule],
  controllers: [ExerciseController],
  providers: [ExerciseService],
  exports: [ExerciseService],
})
export class ExerciseModule {} 