import { create } from "zustand";

export const useProfileStore = create<ProfileState>()((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  updateProfile: (updatedProfile) => set((state) => ({ profile: { ...state.profile, ...updatedProfile } }))
}));