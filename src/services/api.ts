import axios from "axios";

export const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de Requisição: Injeta o token JWT salvo no localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@dummyjson:token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor de Resposta: Trata falhas de rede e erros HTTP
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("@dummyjson:token");
      localStorage.removeItem("@dummyjson:user");
    }
    return Promise.reject(error);
  },
);
