'use client';

import { checkSession, getMe } from '@/app/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  // useEffect(() => {
  //   async function fetchUser() {
  //     // Перевіряємо сесію
  //     const isAuthenticated = await checkSession();
  //     // if (isAuthenticated.message === 'No active session found') {
  //     //   console.log('Error 400: No active session found');
  //     //   return;
  //     // }
  //     // if (isAuthenticated.message === 'Invalid or expired token') {
  //     //   console.log('Error 401: Invalid or expired token');
  //     //   return;
  //     // }

  //     // isAuthenticated.message === 'Session refreshed successfully';

  //     if (isAuthenticated) {
  //       // Якщо сесія валідна — отримуємо користувача
  //       const user = await getMe();
  //       if (user) setUser(user);
  //     } else {
  //       // Якщо сесія невалідна — чистимо стан
  //       clearIsAuthenticated();
  //     }
  //   }
  //   fetchUser();
  // }, [setUser, clearIsAuthenticated]);

  useEffect(() => {
    async function fetchUser() {
      try {
        await checkSession();
        const user = await getMe();
        setUser(user);
      } catch {
        clearIsAuthenticated();
        console.log('ERROR!!!!!!');
      }
    }
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
}