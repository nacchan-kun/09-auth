import axios from 'axios';

const baseURL = 'https://09-auth-gamma-lyart.vercel.app/api';
console.log('CLIENT API - Using baseURL:', baseURL);

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Add this to confirm it's the right file
console.log('This is the CLIENT-SIDE api.ts file');
