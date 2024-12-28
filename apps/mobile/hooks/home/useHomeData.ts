import { ExerciseService } from '../../services/api/exercise/exerciseService';
import { CompetitionService } from '../../services/api/competition/competitionService';
import { useState, useEffect } from 'react';
import { api } from '../../services/api/apiClient';

const exerciseService = new ExerciseService(api);
const competitionService = new CompetitionService(api);

// 개발용 더미 데이터
const MOCK_DATA = {
  summary: {
    calories: 324,
    duration: 45,
    progress: 75
  },
  weeklyProgress: {
    days: [
      { date: '월', calories: 300, duration: 45, completed: true },
      { date: '화', calories: 250, duration: 30, completed: true },
      { date: '수', calories: 0, duration: 0, completed: false },
      { date: '목', calories: 324, duration: 45, completed: true },
      { date: '금', calories: 0, duration: 0, completed: false },
      { date: '토', calories: 0, duration: 0, completed: false },
      { date: '일', calories: 0, duration: 0, completed: false },
    ],
    weeklyGoal: {
      target: 5,
      current: 3
    }
  },
  activeCompetition: {
    type: '1:1 대결',
    remainingTime: '32:14',
    players: [
      { name: '김운동', score: 324 },
      { name: '박근육', score: 298 }
    ]
  }
};

interface HomeData {
  summary: {
    calories: number;
    duration: number;
    progress: number;
  };
  weeklyProgress: {
    days: Array<{
      date: string;
      calories: number;
      duration: number;
      completed: boolean;
    }>;
    weeklyGoal: {
      target: number;
      current: number;
    };
  };
  activeCompetition: {
    type: string;
    remainingTime: string;
    players: Array<{
      name: string;
      score: number;
    }>;
  } | null;
}

export function useHomeData() {
  const [data, setData] = useState<HomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchHomeData() {
    try {
      setIsLoading(true);
      
      if (__DEV__) {
        // 개발 환경에서는 더미 데이터 사용
        await new Promise(resolve => setTimeout(resolve, 1000)); // 로딩 시뮬레이션
        setData(MOCK_DATA);
        return;
      }

      const [summary, competition] = await Promise.all([
        exerciseService.getUserSummary(),
        competitionService.getActiveCompetitions()
      ]);

      setData({
        summary: summary.summary,
        weeklyProgress: summary.weeklyProgress,
        activeCompetition: competition[0] || null
      });
    } catch (err) {
      console.error('Error fetching home data:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchHomeData();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchHomeData
  };
} 