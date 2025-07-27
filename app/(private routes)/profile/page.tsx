import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getServerMe } from '@/lib/api/serverApi';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description: 'View your profile information and manage your account on NoteHub.',
};

export default async function ProfilePage() {
  let user;

  try {
    user = await getServerMe(); // Remove the cookies parameter
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    user = {
      username: 'Guest User',
      email: 'guest@example.com',
      avatar: '/next.svg',
    };
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar || '/next.svg'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username || 'your_username'}</p>
          <p>Email: {user?.email || 'your_email@example.com'}</p>
        </div>
      </div>
    </main>
  );
}
