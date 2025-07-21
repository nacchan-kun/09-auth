'use client';

import { tagsList } from '@/app/constants/constants';
import css from '../TagsMenu/TagsMenu.module.css';
import Link from 'next/link';

type Props = {
  onTagsMenuCloseAction?: () => void;
};

export default function TagsItems({ onTagsMenuCloseAction }: Props) {
  return (
    <>
      {tagsList.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag.split(' ')[0]}`}
            className={css.menuLink}
            onClick={onTagsMenuCloseAction}
          >
            {tag}
          </Link>
        </li>
      ))}
    </>
  );
}