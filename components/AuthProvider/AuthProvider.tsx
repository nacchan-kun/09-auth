'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore(state => state.setUser);
  const clearUser = useAuthStore(state => state.clearUser);

  useEffect(() => {
    async function fetchUser() {
      try {
        await checkSession();
        const user = await getMe();
        setUser(user);
      } catch {
        // Don't log errors, just clear auth state
        clearUser();
      }
    }
    
    // Only run auth check, don't block rendering
    fetchUser();
  }, [setUser, clearUser]);

  // Always render children, don't block on auth loading
  return <>{children}</>;
}