import { create } from 'zustand';

export const useFriendsStore = create<FriendsState>()((set) => ({
  friends: [],
  incoming: [],
  outgoing: [],
  setFriends: (friends) => set({ friends }),
  setIncoming: (incoming) => set({ incoming }),
  setOutgoing: (outgoing) => set({ outgoing }),
  addFriend: (friend) => set((state) => ({ friends: [...state.friends, friend] })),
  addOutgoing: (request) => set((state) => ({ outgoing: [...state.outgoing, request] })),
  removeFriend: (ownerId) => set((state) => ({ friends: state.friends.filter(friend => friend.ownerId !== ownerId) })),
  removeIncoming: (ownerId) => set((state) => ({ incoming: state.incoming.filter(request => request.ownerId !== ownerId) })),
  removeOutgoing: (ownerId) => set((state) => ({ outgoing: state.outgoing.filter(request => request.ownerId !== ownerId) }))
}));
