'use client';

import { Note } from '@/types/note';
import css from './NoteList.module.css';
import NoteItem from '../NoteItem/NoteItem';
import { deleteNote } from '@/app/api/clientApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
  items: Note[];
};

export default function NoteList({ items }: Props) {
  const queryClient = useQueryClient();

  const { mutate: removeItem, isPending } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allNotes'],
      });
    },
  });

  return (
    <ul className={css.list}>
      {items
        // .filter(note => note.id)
        .map(el => (
          <NoteItem
            key={el.id}
            item={el}
            removeItemAction={removeItem}
            isPending={isPending}
          />
        ))}
    </ul>
  );
}