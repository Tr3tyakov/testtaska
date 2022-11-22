import { server } from './API';
import { INewTask } from './http.interfaces';

/**
 * Функция для создания задачи
 * @params newTask - { todoList, name }
 */
export const createTask = async ({ todo_list, name }: INewTask) => {
  return await server.post(`/todo/tasks/`, { todo_list, name });
};

/**
 * Функция для обновления задачи
 * @params id - id конкретной задачи
 * @params name - новое название
 */
export const updateTask = async (todoID: number, todoListID: number, name: string) => {
  return await server.put(`/todo/tasks/${todoID}/`, { todo_list: todoListID, name: name });
};

/**
 * Функция для получения всех задач конкретного листа
 * @params id - id конкретного листа
 */
export const getTasks = async (id: number) => {
  return await server.get(`/todo/tasks/?todo_list=${id}`);
};

/**
 * Функция для удаления задачи
 * @params id - id конкретной задачи
 */
export const deleteTask = async (id: number) => {
  return await server.delete(`/todo/tasks/${id}/`);
};

/**
 * Функция для изменения выполнености задачи
 * @params id - id конкретного задачи
 */
export const completeTask = async (id: number) => {
  return await server.post(`/todo/tasks/complete/${id}/`);
};
