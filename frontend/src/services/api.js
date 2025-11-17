import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8888/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加 token
api.interceptors.request.use(
  (config) => {
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

// 响应拦截器 - 处理错误
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 认证相关
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// 商家相关
export const merchantAPI = {
  getAll: (params) => api.get('/merchants', { params }),
  getById: (id) => api.get(`/merchants/${id}`),
  create: (data) => api.post('/merchants', data),
  update: (id, data) => api.put(`/merchants/${id}`, data),
  delete: (id) => api.delete(`/merchants/${id}`),
};

// 食物包相关
export const foodBagAPI = {
  getAll: (params) => api.get('/foodbags', { params }),
  getNearby: (params) => api.get('/foodbags/nearby', { params }),
  getById: (id) => api.get(`/foodbags/${id}`),
  create: (data) => api.post('/foodbags', data),
  update: (id, data) => api.put(`/foodbags/${id}`, data),
  delete: (id) => api.delete(`/foodbags/${id}`),
};

// 订单相关
export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/my'),
  getMerchantOrders: (merchantId) => api.get(`/orders/merchant/${merchantId}`),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  cancel: (id) => api.put(`/orders/${id}/cancel`),
  review: (id, data) => api.put(`/orders/${id}/review`, data),
};

export default api;
