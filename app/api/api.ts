import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://next-docs-api.onrender.com',
  withCredentials: true,
});

export const nextServer = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

