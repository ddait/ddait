import { create } from 'zustand';
import type { CompetitionOpponent } from '@/components/competition/CompetitionSession/types';

type MatchingStatus = 'idle' | 'searching' | 'matched' | 'failed';

interface MatchingState {
  status: MatchingStatus;
  opponent: CompetitionOpponent | null;
  startMatching: () => void;
  setMatched: (opponent: CompetitionOpponent) => void;
  setFailed: () => void;
  reset: () => void;
}

export const useMatchingStore = create<MatchingState>((set) => ({
  status: 'idle',
  opponent: null,

  startMatching: () => set({ status: 'searching', opponent: null }),
  
  setMatched: (opponent) => set({ status: 'matched', opponent }),
  
  setFailed: () => set({ status: 'failed' }),
  
  reset: () => set({ status: 'idle', opponent: null }),
})); 