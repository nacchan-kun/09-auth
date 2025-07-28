import axios from 'axios';

console.log('SERVER API - Using baseURL: https://notehub-api.goit.study');

export const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});

// Add this to confirm it's the right file
console.log('This is the SERVER-SIDE api.ts file');