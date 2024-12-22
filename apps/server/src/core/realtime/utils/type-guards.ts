import { ExerciseUpdate, CompetitionUpdate } from '../types/realtime.types';

export function isValidExerciseUpdate(data: any): data is ExerciseUpdate {
  return (
    typeof data === 'object' &&
    typeof data.status === 'string' &&
    typeof data.currentDuration === 'number' &&
    typeof data.calories === 'number' &&
    ['active', 'paused', 'completed'].includes(data.status)
  );
}

export function isValidCompetitionUpdate(data: any): data is CompetitionUpdate {
  return (
    typeof data === 'object' &&
    typeof data.status === 'string' &&
    typeof data.currentParticipants === 'number' &&
    typeof data.scores === 'object' &&
    ['waiting', 'active', 'completed'].includes(data.status)
  );
} 