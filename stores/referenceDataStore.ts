import { create } from "zustand";

export const useReferenceTeamStore = create<ReferenceTeamState>()((set) => ({
  teams: [],
  setTeams: (teams) => set({ teams })
}));