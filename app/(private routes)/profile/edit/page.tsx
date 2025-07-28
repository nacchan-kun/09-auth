'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { updateProfile } from '@/lib/api/clientApi';
import { User } from '@/types/user';
import css from './page.module.css';

export default function EditProfilePage() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setError('');

    try {
      const updatedUser = await updateProfile({ username });

      // Update the global authentication store
      setUser(updatedUser);

      router.push('/profile');
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {/* Display user avatar using Next.js Image component */}
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || '/next.svg'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              value={user.email}
              readOnly
              disabled
            />
          </div>

          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}