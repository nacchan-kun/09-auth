import React from 'react';

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function FilterLayout({ children, sidebar }: Props) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        {children}
      </div>
      <div style={{ width: '300px' }}>
        {sidebar}
      </div>
    </div>
  );
}
