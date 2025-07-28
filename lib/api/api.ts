import axios from 'axios';

const baseURL = 'https://09-auth-gamma-lyart.vercel.app/api'; // Hard-coded for testing

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
