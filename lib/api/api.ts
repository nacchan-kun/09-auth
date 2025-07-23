import axios from 'axios';

const baseURL = typeof window !== 'undefined' 
  ? window.location.origin + '/api'
  : process.env.NEXT_PUBLIC_API_URL + '/api';

export const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

