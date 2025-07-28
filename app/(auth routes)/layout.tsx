'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  const router = useRouter();

  useEffect(() => {
    clearIsAuthenticated();
    router.refresh();
    setLoading(false);
  }, [clearIsAuthenticated, router]);

  return <>{loading ? <div>Loading...</div> : children}</>;
}