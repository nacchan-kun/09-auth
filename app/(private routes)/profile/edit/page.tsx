'use client';

// Force dynamic rendering for auth-dependent pages
export const dynamic = 'force-dynamic';

import { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { checkSession, getMe, updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function EditProfilePage() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const clearUser = useAuthStore(
    state => state.clearUser
  );

  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    if (user) {
      setNewUsername(user.username || '');
      return;
    }

    const fetchUser = async () => {
      try {
        await checkSession();
        const fetchedUser = await getMe();
        if (fetchedUser) {
          setUser(fetchedUser);
          setNewUsername(fetchedUser.username || '');
        }
      } catch {
        clearUser();
      }
    };

    fetchUser();
  }, [user, setUser, clearUser]);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  const handleSaveProfile = async (formData: FormData) => {
    const username = formData.get('username') as string;

    try {
      await updateMe({ username });
      if (user) {
        setUser({ ...user, username });
      }
      router.push('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (!user) return null;

  return (
    <main>
      <div>
        <h1>Edit Profile</h1>

        <Image
          src={user.avatar || '/next.svg'}
          alt="User Avatar"
          width={120}
          height={120}
        />

        <form action={handleSaveProfile}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              value={newUsername}
              onChange={handleUsernameChange}
            />
          </div>

          <p>Email: {user.email}</p>

          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
}