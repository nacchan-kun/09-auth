import { api } from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  username?: string;
}

export const login = async (credentials: LoginRequest): Promise<User> => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const register = async (credentials: RegisterRequest): Promise<User> => {
  const response = await api.post('/auth/register', credentials);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const getSession = async (): Promise<User | null> => {
  try {
    const response = await api.get('/auth/session');
    return response.data;
  } catch {
    return null;
  }
};

// If you have getSession, also export it as checkSession:
export { getSession as checkSession };

export const getMe = async (): Promise<User> => {
  const response = await api.get('/users/me');
  return response.data;
};

export const updateMe = async (userData: UpdateUserRequest): Promise<User> => {
  const response = await api.patch('/users/me', userData);
  return response.data;
};

export const fetchNotes = async (params: {
  search?: string;
  page?: number;
  tag?: string;
}): Promise<{ notes: Note[]; totalPages: number }> => {
  const response = await api.get('/notes', {
    params: {
      ...params,
      perPage: 12,
    },
  });
  return response.data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const response = await api.post('/notes', note);
  return response.data;
};

export const getNoteById = async (id: string): Promise<Note> => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};