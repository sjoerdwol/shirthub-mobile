import { create } from 'zustand';

export const useUserStatisticsStore = create<UserStatisticsStore>()((set) => ({
  hasChanged: false,
  userStatistics: null,
  setHasChanged: (hasChanged) => set({ hasChanged }),
  setUserStatistics: (userStatistics) => set({ userStatistics })
}));