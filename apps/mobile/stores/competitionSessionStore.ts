import { create } from 'zustand';

type SessionStatus = 'ready' | 'in_progress' | 'completed';

interface CompetitionSessionState {
  myScore: number;
  opponentScore: number;
  remainingTime: number;
  progress: number;
  status: SessionStatus;
  startSession: () => void;
  updateMyScore: (score: number) => void;
  updateOpponentScore: (score: number) => void;
  updateRemainingTime: (time: number) => void;
  updateProgress: (progress: number) => void;
  giveUp: () => void;
  reset: () => void;
}

export const useCompetitionSessionStore = create<CompetitionSessionState>((set) => ({
  myScore: 0,
  opponentScore: 0,
  remainingTime: 180,
  progress: 0,
  status: 'ready',

  startSession: () => set({ status: 'in_progress' }),

  updateMyScore: (score) => set({ myScore: score }),

  updateOpponentScore: (score) => set({ opponentScore: score }),

  updateRemainingTime: (time) => set((state) => ({
    remainingTime: time,
    status: time === 0 ? 'completed' : state.status,
  })),

  updateProgress: (progress) => set({ progress }),

  giveUp: () => set({ status: 'completed' }),

  reset: () => set({
    myScore: 0,
    opponentScore: 0,
    remainingTime: 180,
    progress: 0,
    status: 'ready',
  }),
})); 