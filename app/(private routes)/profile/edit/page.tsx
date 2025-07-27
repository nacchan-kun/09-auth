'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api/api'; // Replace nextServer with api
import { User } from '@/types/user';
import css from './page.module.css';

export default function EditProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Get user data from localStorage or API
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setUsername(parsedUser.username || '');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.patch('/users/me', { username });
      const updatedUser = response.data;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      router.push('/profile');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Edit Profile</h1>
        </div>

        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.inputGroup}>
            <label htmlFor="username" className={css.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={css.input}
              required
            />
          </div>

          <div className={css.inputGroup}>
            <label htmlFor="email" className={css.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              className={css.input}
              disabled
            />
          </div>

          {error && <div className={css.error}>{error}</div>}

          <div className={css.buttonGroup}>
            <button
              type="button"
              onClick={() => router.push('/profile')}
              className={css.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={css.submitButton}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}