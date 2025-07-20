import css from './CreateNote.module.css';
import { Metadata } from 'next';
import NoteForm from '../../../../components/NoteForm/NoteForm';

export const metadata: Metadata = {
  title: 'Create note - NoteHub',
  description: 'Create a new note in your NoteHub workspace',
  openGraph: {
    title: 'Create note - NoteHub',
    description: 'Create a new note in your NoteHub workspace',
    url: 'https://08-zustand-snowy.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg', // Опціонально
        width: 1200,
        height: 630,
        alt: 'Create note preview',
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}