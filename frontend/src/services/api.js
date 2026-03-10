import axios from 'axios';

// Use environment variable instead of hardcoded localhost
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getNotes = () => axios.get(`${API_BASE_URL}/notes`);
export const getNoteById = (id) => axios.get(`${API_BASE_URL}/notes/${id}`);
export const createNote = (note) => axios.post(`${API_BASE_URL}/notes`, note);
export const updateNote = (id, note) => axios.put(`${API_BASE_URL}/notes/${id}`, note);
export const deleteNote = (id) => axios.delete(`${API_BASE_URL}/notes/${id}`);