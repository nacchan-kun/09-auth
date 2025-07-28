'use client';

import React from 'react';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/clientApi';
import { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      // Invalidate and refetch notes after successful deletion
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      console.error('Failed to delete note:', error);
    },
  });

  const handleDelete = (noteId: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteMutation.mutate(noteId);
    }
  };

  if (!notes || notes.length === 0) {
    return (
      <div className={css.emptyState}>
        <p>No notes found. Create your first note!</p>
      </div>
    );
  }

  return (
    <div className={css.noteList}>
      {notes.map((note) => (
        <div key={note.id} className={css.noteCard}>
          {/* Note Title */}
          <h3 className={css.noteTitle}>
            <Link href={`/notes/${note.id}`} className={css.noteLink}>
              {note.title}
            </Link>
          </h3>

          {/* Note Content */}
          <p className={css.noteContent}>
            {note.content.length > 150
              ? `${note.content.substring(0, 150)}...`
              : note.content}
          </p>

          {/* Note Tag */}
          {note.tag && (
            <div className={css.tagContainer}>
              <span className={css.tag}>#{note.tag}</span>
            </div>
          )}

          {/* Note Actions */}
          <div className={css.noteActions}>
            <Link href={`/notes/${note.id}`} className={css.viewButton}>
              View
            </Link>
            <button
              onClick={() => handleDelete(note.id)}
              className={css.deleteButton}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>

          {/* Note Metadata */}
          <div className={css.noteMeta}>
            <span className={css.noteDate}>
              {new Date(note.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}