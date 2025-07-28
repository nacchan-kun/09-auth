'use client';

import { useRouter } from 'next/navigation';
import css from './SignInPage.module.css';
import { LoginRequest } from '@/types/authorisationTypes';
import { login } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Отримуємо метод із стора
  const setUser = useAuthStore(state => state.setUser);

  const handleLogin = async (formData: FormData) => {
    try {
      setError('');
      setIsLoading(true);
      const formValues = Object.fromEntries(formData) as LoginRequest;
      const res = await login(formValues);
      if (res) {
        // Записуємо користувача у глобальний стан
        setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.log('error', error);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const formValues = Object.fromEntries(formData) as LoginRequest;
      const res = await login(formValues.email, formValues.password);

      if (res) {
        // Записуємо користувача у глобальний стан
        setUser(res);
        router.push('/profile');
      }
    } catch (error: unknown) {
      console.error('error', error);

      // Type guard for axios error
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number; data?: { message?: string } } };
        if (axiosError.response?.status === 401) {
          setError('Invalid email or password. Please check your credentials and try again.');
        } else if (axiosError.response?.data?.message) {
          setError(axiosError.response.data.message);
        } else {
          setError('Login failed. Please try again.');
        }
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <form onSubmit={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Log in'}
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}