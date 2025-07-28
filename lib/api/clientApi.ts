import { Note } from '@/types/note';
import { User } from '@/types/user';
import { api } from './api';
import { FetchNotesParams, FetchNotesHTTPResponse } from './serverApi';

export type AuthRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  username: string;
};

export const fetchNotes = async ({ search, page, tag }: FetchNotesParams) => {
  const response = await api.get<FetchNotesHTTPResponse>('/notes', {
    params: {
      ...(search !== '' && { search }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
  });
  return response.data;
};

export const getNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export type CreateNoteParams = {
  title: string;
  content: string;
  tag?: string;
};

export async function createNote({
  title,
  content,
  tag,
}: CreateNoteParams): Promise<Note> {
  const response = await api.post<Note>('/notes', {
    title,
    content,
    tag,
  });
  return response.data;
}

export const deleteNote = async (id: string) => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

// Add token handling to login/register
export const login = async (formValues: { email: string; password: string }) => {
  const response = await api.post('/auth/login', formValues);

  // If API returns a token, store it
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  }

  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await api.post('/auth/register', { email, password });

  // If API returns a token, store it
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  }

  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async () => {
  await api.get('/auth/session');
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get('/users/me');
  return data;
};

export const updateMe = async (updata: UpdateUserRequest): Promise<User> => {
  const { data } = await api.patch('/users/me', updata);
  return data;
};