import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User endpoints
export const userAPI = {
  createUser: (data) => api.post('/users', data),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
};

// Search endpoints
export const searchAPI = {
  createSearch: (userId, data) => api.post(`/users/${userId}/searches`, data),
  getSearches: (userId) => api.get(`/users/${userId}/searches`),
  updateSearch: (id, data) => api.put(`/searches/${id}`, data),
  deleteSearch: (id) => api.delete(`/searches/${id}`),
};

// Property endpoints
export const propertyAPI = {
  search: (data) => api.post('/properties/search', data),
  getProperty: (id) => api.get(`/properties/${id}`),
};

// Saved properties endpoints
export const savedAPI = {
  save: (userId, propertyId, notes = '') => 
    api.post(`/users/${userId}/saved-properties`, { property_id: propertyId, notes }),
  getSaved: (userId) => api.get(`/users/${userId}/saved-properties`),
  removeSaved: (id) => api.delete(`/saved-properties/${id}`),
};

// Inquiry endpoints
export const inquiryAPI = {
  send: (userId, data) => api.post(`/users/${userId}/inquiries`, data),
  getInquiries: (userId) => api.get(`/users/${userId}/inquiries`),
};

// Stats endpoint
export const statsAPI = {
  getStats: () => api.get('/stats'),
};

export default api;
