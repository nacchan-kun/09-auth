import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { api } from './api';
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
  return cookieStore.getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
};

export const getServerMe = async (): Promise<User | null> => {
  try {
    const cookieHeader = await getCookieHeader();
    const response = await api.get<User>('/users/me', {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in getServerMe:', error);
    return null;
  }
};

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesHTTPResponse> => {
  try {
    const cookieHeader = await getCookieHeader();
    const response = await api.get<FetchNotesHTTPResponse>('/notes', {
      params: {
        ...(params.search && { search: params.search }),
        page: params.page || 1,
        perPage: 12,
        ...(params.tag && { tag: params.tag }),
      },
      headers: { Cookie: cookieHeader },
    });
    return response.data;
  } catch (error) {
    console.error('Error in fetchNotes:', error);
    return { notes: [], totalPages: 0 };
  }
};

export const checkSession = async (): Promise<AxiosResponse<ServerResponse>> => {
  const cookieHeader = await getCookieHeader();
  const response = await api.get<ServerResponse>('/auth/session', {
    headers: { Cookie: cookieHeader },
  });
  return response; // Return the full Axios response object, not response.data
};

export const getNoteById = async (id: string): Promise<Note | null> => {
  try {
    const cookieHeader = await getCookieHeader();
    const response = await api.get<Note>(`/notes/${id}`, {
      headers: { Cookie: cookieHeader },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in getNoteById for ID ${id}:`, error);
    return null;
  }
};