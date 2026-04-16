import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      console.error('Network error: Cannot connect to backend server');
      // Don't reject here, let the component handle it
    } else if (error.code === 'ECONNABORTED') {
      // Handle timeout
      console.error('Request timeout');
    } else if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access');
      // Optionally redirect to login
    } else if (error.response?.status === 500) {
      // Handle server errors
      console.error('Server error:', error.response?.data);
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  updateStatus: (id, status) => api.put(`/contact/${id}`, { status }),
};

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData),
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  }
};

export const projectAPI = {
  create: (projectData) => api.post('/projects', projectData),
  getAll: () => api.get('/projects'),
  getFeatured: () => api.get('/projects/featured'),
  getById: (id) => api.get(`/projects/${id}`),
  update: (id, projectData) => api.put(`/projects/${id}`, projectData),
  delete: (id) => api.delete(`/projects/${id}`),
};

// Export both named and default for flexibility
export { api };
export default api;