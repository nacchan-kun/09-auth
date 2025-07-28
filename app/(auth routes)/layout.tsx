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
  const clearUser = useAuthStore(state => state.clearUser);

  const router = useRouter();

  useEffect(() => {
    clearUser();
    router.refresh();
    setLoading(false);
  }, [clearUser, router]);

  return <>{loading ? <div>Loading...</div> : children}</>;
}