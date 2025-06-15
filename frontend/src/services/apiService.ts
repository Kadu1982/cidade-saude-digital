import axios from 'axios';

export const apiService = axios.create({
  baseURL: 'http://localhost:5011/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para adicionar token JWT automaticamente
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta para capturar erro 401 e redirecionar
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('operadorData');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiService;
