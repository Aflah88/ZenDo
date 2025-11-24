import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const apiClient = axios.create({
  baseURL: API_URL,
});

// GET semua barang
export const getBarang = () => apiClient.get('/barang');

// GET barang by ID
export const getBarangById = (id: number) => apiClient.get(`/barang/${id}`);

// POST barang baru
export const createBarang = (data: any) => apiClient.post('/barang', data);

// PUT update barang
export const updateBarang = (id: number, data: any) =>
  apiClient.put(`/barang/${id}`, data);

// DELETE barang
export const deleteBarang = (id: number) => apiClient.delete(`/barang/${id}`);
