import { Note } from './note';

export type ResponseGetData = {
  notes: Note[];
  totalPages: number;
};

export type RegisterResponse = {
  username: string;
  email: string;
  avatar: string;
};

export type LoginResponse = {
  username: string;
  email: string;
  avatar: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};