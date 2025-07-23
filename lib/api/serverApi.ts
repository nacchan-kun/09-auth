import { cookies } from 'next/headers';
import { api } from './api';
// import { ResponseGetData } from '@/types/authorisationTypes';
import { Note } from '@/types/note';
import { User } from '@/types/user';

export interface FetchNotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

export type FetchNotesParams = {
  search?: string;
  page?: number;
  tag?: string;
};

export async function fetchNotes(params: FetchNotesParams = {}): Promise<FetchNotesHTTPResponse> {
  const cookieStore = await cookies();
  const { search = '', page = 1, tag } = params;
  
  const response = await api.get<FetchNotesHTTPResponse>('/notes', {
    params: {
      ...(search !== '' && { search }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function checkServerSession() {
  const cookieStore = await cookies();
  const response = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await api.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function getNoteById(noteId: string): Promise<Note> {
  return fetchNoteById(noteId);
}

export async function getServerMe(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await api.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}