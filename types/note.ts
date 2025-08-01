export type Tag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface Note {
  id: string;
  title: string;
  content: string;
  tag?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface NewNote {
  title: string;
  content: string;
  tag: Tag;
}