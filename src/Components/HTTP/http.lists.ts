import { server } from './API';

/**
 * Функция для создания нового листа
 * @params name имя нового листа
 */
//fix params
export const createTodoList = async (name: string) => {
  return await server.post(`/todo/lists/`, { name });
};

/**
 * Функция для обновления конкретного листа
 * @params name имя нового листа
 * @params id - идентификационный номер листа
 */
//fix params
export const updateList = async (id: number, name: string) => {
  return await server.put(`/todo/lists/${id}/`, {
    name,
  });
};

/**
 * Функция для получения всех листов
 * @params name имя нового листа
 * @params id - идентификационный номер листа
 */
export const getLists = async () => {
  return await server.get(`/todo/lists/`);
};

/**
 * Функция для удаления листа
 * @params id - идентификационный номер листа
 */
export const deleteList = async (id: number) => {
  return await server.delete(`/todo/lists/${id}/`);
};
