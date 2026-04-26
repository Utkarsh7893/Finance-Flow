import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api };

export const useStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  termsAccepted: false,
  login: (userData, token) => {
    localStorage.setItem('token', token);
    set({ user: userData, isAuthenticated: true, termsAccepted: userData.termsAccepted || false });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false, termsAccepted: false });
  },
  acceptTerms: () => {
    set({ termsAccepted: true });
  },
  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    // Always require re-login — clear token so user lands on /login
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  }
}));
