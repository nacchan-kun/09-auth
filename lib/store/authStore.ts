import { User } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      user: null,
      isAuthenticated: false,
      setUser: user => set(() => ({ user, isAuthenticated: true })),
      clearIsAuthenticated: () =>
        set(() => ({ user: null, isAuthenticated: false })),
    }),
    {
      name: 'authorization',
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);