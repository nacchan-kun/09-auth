import { cookies } from 'next/headers';
import { api } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';
import { AxiosResponse } from 'axios';

export interface FetchNotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  search?: string;
  page?: number;
  tag?: string;
}

export type ServerResponse = {
  success: boolean;
};

export const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
};

export const getServerMe = async (cookies: string) => {
  const response = await api.get('/users/me', {
    headers: {
      Cookie: cookies,
    },
  });
  return response.data;
};

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesHTTPResponse> => {
  const cookieHeader = await getCookieHeader();
  const response = await nextServer.get<FetchNotesHTTPResponse>('/notes', {
    params: {
      ...(params.search && { search: params.search }),
      page: params.page,
      perPage: 12,
      ...(params.tag && { tag: params.tag }),
    },
    headers: { Cookie: cookieHeader },
  });
  return response.data;
};

export const checkSession = async (): Promise<AxiosResponse<ServerResponse>> => {
  const cookieHeader = await getCookieHeader();
  return await nextServer.get<ServerResponse>('/auth/session', {
    headers: { Cookie: cookieHeader },
  });
};

export const getNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });
  return data;
};