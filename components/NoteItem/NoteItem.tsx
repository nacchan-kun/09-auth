'use client';

import { Note } from '@/types/note';
import css from '../NoteList/NoteList.module.css';
import Link from 'next/link';

type Props = {
  item: Note;
  isPending: boolean;
  removeItemAction: (id: string) => void;
};

export default function NoteItem({ item, isPending, removeItemAction }: Props) {
  return (
    <li className={css.listItem}>
      <h2 className={css.title}>{item.title}</h2>
      <p className={css.content}>{item.content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{item.tag}</span>
        <Link className={css.link} href={`/notes/${item.id}`}>
          View details
        </Link>
        <button
          className={css.button}
          onClick={() => {
            removeItemAction(item.id);
          }}
          disabled={isPending}
        >
          Delete
        </button>
      </div>
    </li>
  );
}