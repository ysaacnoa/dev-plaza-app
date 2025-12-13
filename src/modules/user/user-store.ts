import { create } from 'zustand';
import { UserProfile } from '../user/user.types';

interface UserState {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
}

export const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: user => set({ user }),
}));
