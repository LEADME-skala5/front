import { create } from 'zustand';

interface PeerKeywordEvaluationState {
  selectedKeywords: { [teammateId: number]: number[] };
  setKeywords: (teammateId: number, keywordIds: number[]) => void;
  clearKeywords: () => void;
}

export const usePeerKeywordEvaluationStore = create<PeerKeywordEvaluationState>((set) => ({
  selectedKeywords: {},
  setKeywords: (teammateId, keywordIds) =>
    set((state) => ({
      selectedKeywords: {
        ...state.selectedKeywords,
        [teammateId]: keywordIds,
      },
    })),
  clearKeywords: () => set({ selectedKeywords: {} }),
}));
