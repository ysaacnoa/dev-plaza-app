import { create } from 'zustand';
import { UserProfile } from '../user.types';
import { loadLoggedUser, clearLoggedUser } from '../storage/user-storage';

interface UserState {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  logout: () => Promise<void>;
  loadActiveUser: () => Promise<void>;
}

export const useUserStore = create<UserState>(set => ({
  user: null,

  setUser: user => set({ user }),

  logout: async () => {
    set({ user: null });
    await clearLoggedUser();
  },

  loadActiveUser: async () => {
    const loggedUser = await loadLoggedUser();
    if (loggedUser) set({ user: loggedUser });
  },
}));
