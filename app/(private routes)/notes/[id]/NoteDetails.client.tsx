'use client';

import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api/clientApi';
import css from './NoteDetails.module.css';

interface Props {
  noteId?: string;
}

const NoteDetailsClient: FC<Props> = ({ noteId }) => {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => getNoteById(noteId!),
    enabled: !!noteId,
    refetchOnMount: false,
    retry: 1,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error) {
    console.error('Error fetching note:', error);
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Error Loading Note</h2>
        <p>Unable to load the note. Please try again later.</p>
        <details style={{ marginTop: '10px', textAlign: 'left' }}>
          <summary>Error Details</summary>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
            {error instanceof Error ? error.message : 'Unknown error'}
          </pre>
        </details>
      </div>
    );
  }

  if (!note) return <p>Note not found.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{note.content}</p>
        <div className={css.tagdate}>
          {note.tag && <p className={css.tag}>{note.tag}</p>}
          <p className={css.date}>
            {(() => {
              try {
                const date = new Date(note.createdAt);
                if (isNaN(date.getTime())) {
                  return 'Invalid date';
                }
                return new Intl.DateTimeFormat('uk-UA', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                }).format(date);
              } catch {
                return 'Date unavailable';
              }
            })()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailsClient;