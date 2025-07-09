import axios from 'axios';

const API_URL = 'https://gmk-web-api.chronopulse.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Slider APIs
export const getSliderItems = async () => {
  const response = await api.get('/slider');
  return response.data;
};

// News APIs
export const getLatestNews = async (limit = 5) => {
  const response = await api.get(`/news/latest?limit=${limit}`);
  return response.data;
};

// Events APIs
export const getUpcomingEvents = async (limit = 5) => {
  const response = await api.get(`/events?limit=${limit}`);
  return response.data;
};

// About APIs
export const getAboutContent = async () => {
  const response = await api.get('/about');
  return response.data;
};

export const getAboutById = async (id) => {
  const response = await api.get(`/about/${id}`);
  return response.data;
};

// Gallery APIs
export const getGalleryItems = async () => {
  const response = await api.get('/gallery');
  return response.data;
};

// History APIs
export const getHistoryItems = async () => {
  const response = await api.get('/history');
  return response.data;
};

// Contact APIs
export const submitContactForm = async (formData) => {
  const response = await api.post('/messages', formData);
  return response.data;
};

export const getAllContacts = async () => {
  const response = await api.get('/contact');
  return response.data;
};

export const getContact = async (id) => {
  const response = await api.get(`/contact/${id}`);
  return response.data;
};

export default api;
