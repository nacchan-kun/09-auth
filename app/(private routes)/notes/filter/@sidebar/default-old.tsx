import styles from './SidebarNotes.module.css';
import { fetchNotes } from '@/lib/api/serverApi';
import Link from 'next/link';
import type { Tag } from '@/types/note';

const NotesSidebar = async () => {
  let tags: Tag[] = [];
  
  // Helper function to check if a value is a valid Tag
  const isValidTag = (tag: string | undefined): tag is Tag => {
    const validTags: Tag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
    return tag !== undefined && validTags.includes(tag as Tag);
  };

  try {
    const response = await fetchNotes({});
    const rawTags: Tag[] = response?.notes
      ?.map(note => note.tag)
      .filter(isValidTag) ?? []; // Use the isValidTag function here
  
    const uniqueTags = Array.from(new Set<Tag>(rawTags));
    tags = [...uniqueTags];
  } catch (error) {
    console.error('Failed to fetch notes for sidebar:', error);
    // Fallback to default tags
    tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
  }

  return (
    <aside className={styles.sidebarContainer}>
      <h3 className={styles.sidebarTitle}>Filter by Tag</h3>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link href="/notes/filter/all" className={styles.menuLink}>
            All notes
          </Link>
        </li>
        {tags.map(tag => (
          <li key={tag} className={styles.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={styles.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NotesSidebar;