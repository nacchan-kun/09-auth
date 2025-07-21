import type { Note, NewNote } from '../../types/note';
import { ResponseGetData } from '@/types/ResponseGetData';
import { nextServer as api } from './api';
import {
  LoginResponse,
  RegisterResponse,
  LoginRequest,
  RegisterRequest,
} from '@/types/authorisationTypes';
import { User } from '@/types/user';
// import { SessionResponse } from '@/types/sessionTypes';

export async function fetchNotes(params: {
  search: string;
  page: number;
  tag?: string;
}): Promise<ResponseGetData> {
  const { search, page, tag } = params;
  const { data } = await api.get<ResponseGetData>('/notes', {
    params: {
      page,
      perPage: 16,
      ...(search !== '' ? { search } : {}),
      ...(tag && tag !== 'All' ? { tag } : {}),
    },
  });
  return data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const { data } = await api.post<Note>('/notes', newNote);
  return data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${noteId}`);
  return data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${noteId}`);
  return data;
}

export async function getNoteById(noteId: string): Promise<Note> {
  return fetchNoteById(noteId);
}

export async function register(credentials: RegisterRequest) {
  const { data } = await api.post<RegisterResponse>(
    `/auth/register`,
    credentials
  );
  return data;
}

export async function login(credentials: LoginRequest) {
  const { data } = await api.post<LoginResponse>(`/auth/login`, credentials);
  return data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function checkSession() {
  const { data } = await api.get<{ success: true }>('/auth/session');
  return data;
}

export async function getMe() {
  const { data } = await api.get<User>('/users/me');
  return data;
}

export async function userUpdate(user: User) {
  const { data } = await api.patch<User>('/users/me', user);
  return data;
}