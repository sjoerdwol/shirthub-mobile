import { create } from "zustand";

export const useReferenceDataStore = create<ReferenceDataState>()((set) => ({
  data: null,
  setReferenceData: (data) => set({ data })
}));