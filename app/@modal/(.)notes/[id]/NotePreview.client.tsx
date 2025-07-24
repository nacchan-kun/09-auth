'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
//import NotePreview from '@/components/NotePreview/NotePreview';
import css from '@/app/@modal/(.)notes/[id]/NotePreview.client.module.css';
import Loader from '@/components/Loader/Loader';
import { getNoteById } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const handleClose = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={handleClose}>
      {isLoading && <Loader />}
      {error && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h3>Error Loading Note</h3>
          <p>Unable to load the note preview.</p>
          <button onClick={handleClose} style={{ marginTop: '10px', padding: '8px 16px' }}>
            Close
          </button>
        </div>
      )}
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <button onClick={handleClose} className={css.backBtn}>
                ← Back
              </button>
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
      )}
    </Modal>
  );
}