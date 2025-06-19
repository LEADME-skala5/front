import { create } from 'zustand';

interface weeklyEvaluationState {
  selectedScores: { [taskId: number]: number };
  setScore: (taskId: number, score: number) => void;
  clearScores: () => void;
}

export const useWeeklyEvaluationStore = create<weeklyEvaluationState>((set) => ({
  selectedScores: {},
  setScore: (taskId, score) =>
    set((state) => ({
      selectedScores: {
        ...state.selectedScores,
        [taskId]: score,
      },
    })),
  clearScores: () => set({ selectedScores: {} }),
}));
