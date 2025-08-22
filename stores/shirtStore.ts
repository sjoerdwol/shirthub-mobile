import { create } from 'zustand';

export const useShirtStore = create<ShirtState>()((set) => ({
  shirts: [],
  addShirt: (shirt) => set((state) => ({ shirts: [...state.shirts, shirt] })),
  setShirts: (shirts) => set({ shirts }),
  updateShirt: (id, updatedShirt) => set((state) => ({ shirts: state.shirts.map(shirt => shirt.id === id ? { ...shirt, ...updatedShirt } : shirt) })),
  removeShirt: (id) => set((state) => ({ shirts: state.shirts.filter(shirt => shirt.id !== id) }))
}));