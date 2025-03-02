import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (email: string, password: string) => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },
};

export const books = {
  search: async (query: string) => {
    const response = await api.get(`/books/search/${query}`);
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },
};

export const favorites = {
  getAll: async () => {
    const response = await api.get('/favorites');
    return response.data;
  },
  add: async (bookId: string) => {
    const response = await api.post('/favorites', { id: bookId });
    return response.data;
  },
  remove: async (bookId: string) => {
    const response = await api.delete(`/favorites/${bookId}`);
    return response.data;
  },
};

export default api; 