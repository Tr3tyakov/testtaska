import axios from 'axios';

export const API = 'http://dev1.itpw.ru:8083';
export const config = {
  baseURL: API,
};

export const server = axios.create(config);

/**
 * Перехватчик запросов, позволяющий добавить в header authorization bearer token
 */
server.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('Token')}`;
  return config;
});
