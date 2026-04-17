import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach Authorization token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (payload) => api.post('/auth/register', payload);

// JD Management
export const getJDs = () => api.get('/jds');
export const uploadJD = (text, file) => {
  const formData = new FormData();
  if (text) formData.append('text', text);
  if (file) formData.append('file', file);
  return api.post('/jds', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
export const processJD = (jdId) => api.post(`/jds/${jdId}/process`);

// CV Upload & Matching
export const uploadCV = (file, jdId) => {
  const formData = new FormData();
  formData.append('file', file);
  if (jdId) formData.append('jdId', jdId);
  return api.post('/cv', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
export const getMatchResult = (cvId) => api.get(`/cv/${cvId}/match`);
export const getCurationHistory = () => api.get('/cv/history');

// CV Upload — direct to CloudFront → S3 Bucket #2
export const uploadCVToS3 = async (file, onProgress) => {
  // Generate a unique filename to avoid collisions
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const key = `cv-uploads/${timestamp}_${safeName}`;

  // Upload through CloudFront (same domain as our website)
  const cloudFrontUrl = window.location.origin;

  return axios.put(`${cloudFrontUrl}/${key}`, file, {
    headers: {
      'Content-Type': file.type,
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percent);
      }
    },
  });
};

export default api;
