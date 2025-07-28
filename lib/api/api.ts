import axios from 'axios';

console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://notehub-api.goit.study';

console.log('Final baseURL:', baseURL);

export const api = axios.create({
  baseURL, // Remove the '/api' suffix
});
