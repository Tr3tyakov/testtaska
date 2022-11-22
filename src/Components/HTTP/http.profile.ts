import axios from 'axios';
import { API, server } from './API';

/**
 * Функция для регистрации нового пользователя
 * @params username имя
 * @params password пароль
 */
export const registration = async (username: string, password: string) => {
  return await axios.post(`${API}/accounts/authentication/reg/`, {
    password,
    username,
  });
};

/**
 * Функция для аутентификации пользователя
 * @params username имя
 * @params password пароль
 */
export const authentication = async (username: string, password: string) => {
  return await axios.post(`${API}/accounts/authentication/auth/`, { password, username });
};

export const getProfile = async () => {
  return await server.get('/accounts/profile/my_profile/');
};
