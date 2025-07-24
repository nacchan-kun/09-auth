'use client';

import { register } from '@/lib/api/clientApi';
import { RegisterRequest } from '@/types/authorisationTypes';
import { User } from '@/types/user';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import css from './SignUpPage.module.css';

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      setError('');
      setIsLoading(true);
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const user = await register(formValues);
      if (user) {
        // Create a proper User object with avatar field
        const userWithAvatar: User = {
          ...user,
          avatar: user.avatar || '', // Ensure avatar is always a string
        };
        setUser(userWithAvatar);
        router.replace('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.log('error', error);
      setError('Oops... Something went wrong, try later');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign up</h1>
        
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className={css.input}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className={css.input}
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton} disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}