/**
 * Функция для валидации данных
 * @param username имя пользователя
 * @param password  пароль пользователя
 * @param repeatPassword повторный пароль
 * @return в случае ошибки, возвращает message c ошибкой
 */
export const validationData = (
  username: string,
  password: string,
  repeatPassword?: string | undefined,
) => {
  if (username.trim() === '' || password.trim() === '') return 'Поля не должны быть пустыми';
  if (password.trim() !== repeatPassword?.trim()) return 'Пароли не совпадают';
};
