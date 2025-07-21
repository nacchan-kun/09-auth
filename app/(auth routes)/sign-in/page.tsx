'use client';

import { useRouter } from 'next/navigation';
import css from './SignInPage.module.css';
import { LoginRequest } from '@/types/authorisationTypes';
import { login } from '@/app/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState('');
  // Отримуємо метод із стора
  const setUser = useAuthStore(state => state.setUser);

  const handleLogin = async (formData: FormData) => {
    try {
      setError('');
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
    }
  };

  return (
    <form action={handleLogin} className={css.form}>
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
        <button type="submit" className={css.submitButton}>
          Log in
        </button>
      </div>

      <p className={css.error}>{error}</p>
    </form>
  );
}