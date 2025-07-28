import axios from 'axios';

console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL); // Debug log

const baseURL = (process.env.NEXT_PUBLIC_API_URL || 'https://notehub-api.goit.study') + '/api';

console.log('Final baseURL:', baseURL); // Debug log

export const api = axios.create({
  baseURL,
});
