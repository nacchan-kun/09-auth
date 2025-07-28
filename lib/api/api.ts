import axios from 'axios';

const baseURL = 'https://09-auth-gamma-lyart.vercel.app/api';

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
