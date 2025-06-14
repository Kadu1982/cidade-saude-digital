// src/services/apiService.ts

import axios from 'axios';

const apiService = axios.create({
    baseURL: 'http://localhost:5011/api', // Padronizado com /api
    headers: {
        'Content-Type': 'application/json',
    },
});// src/services/apiService.ts

import axios from 'axios';

const apiService = axios.create({
    baseURL: 'http://localhost:5011/api', // Padronizado com /api
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar token JWT automaticamente
apiService.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Padronizado para authToken
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
