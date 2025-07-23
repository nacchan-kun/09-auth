import React from 'react';
import styles from './FilterLayout.module.css';

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function FilterLayout({ children, sidebar }: Props) {
  return (
    <div className={styles.container}>
      <main className={styles.content}>
        {children}
      </main>
      <aside className={styles.sidebar}>
        {sidebar}
      </aside>
    </div>
  );
}
