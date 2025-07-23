import Link from 'next/link';
import type { Tag } from '@/types/note';

const TestSidebar = () => {
  const tags: Tag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

  return (
    <aside style={{
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      height: 'fit-content'
    }}>
      <h3 style={{
        margin: 0,
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e9ecef',
        fontSize: '1.1rem',
        fontWeight: 600,
        color: '#495057'
      }}>Filter by Tag</h3>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0
      }}>
        <li style={{ borderBottom: '1px solid #f0f0f0' }}>
          <Link href="/notes/filter/all" style={{
            display: 'block',
            padding: '12px 16px',
            color: '#333',
            textDecoration: 'none',
            fontWeight: 500
          }}>
            All notes
          </Link>
        </li>
        {tags.map(tag => (
          <li key={tag} style={{ borderBottom: '1px solid #f0f0f0' }}>
            <Link href={`/notes/filter/${tag}`} style={{
              display: 'block',
              padding: '12px 16px',
              color: '#333',
              textDecoration: 'none',
              fontWeight: 500
            }}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const TestFilterPage = () => {
  return (
    <div style={{
      display: 'flex',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      minHeight: 'calc(100vh - 200px)'
    }}>
      <main style={{
        flex: 1,
        minWidth: 0
      }}>
        <h1>Test Filter Page</h1>
        <p>This is a test page to verify the sidebar layout works correctly.</p>
        <div style={{ padding: '2rem', background: '#f8f9fa', borderRadius: '8px' }}>
          <h2>Notes Content Area</h2>
          <p>The main content would go here.</p>
          <p>The sidebar should appear on the right side of this content.</p>
        </div>
      </main>
      <div style={{
        width: '280px',
        flexShrink: 0
      }}>
        <TestSidebar />
      </div>
    </div>
  );
};

export default TestFilterPage;
