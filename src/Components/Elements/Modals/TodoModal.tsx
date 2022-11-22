import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { createTask } from '../../HTTP/http.task';
import { ITodoModal } from './modal.interface';
import { createNewTask } from '../../Store/Reducers/tasks/taskReducer';
import { useAppDispatch } from '../../Hooks/useTypeSelector';
import BaseModalWrapper from './BaseModal';
import CloseIcon from '@mui/icons-material/Close';

const TodoModal: React.FC<ITodoModal> = ({
  active,
  changeActiveModal,
  currentList,
  openSnackBar,
}): any => {
  const [inputTodo, setInputTodo] = React.useState<string>('');
  const dispatch = useAppDispatch();
  const changeTaskName = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputTodo(e.currentTarget.value);
  };

  const sendTask = async () => {
    try {
      if (currentList === null) {
        openSnackBar({ message: 'Сначала требуется выбрать лист задач' });
        return;
      }
      if (inputTodo.length === 0) {
        openSnackBar({ message: 'Поле не может быть пустым' });
        return;
      }
      const { data, status } = await createTask({ todo_list: currentList!.id, name: inputTodo });
      if (status === 201) {
        dispatch(createNewTask(data));
        setInputTodo('');
        changeActiveModal();
      }
    } catch (e) {
      const result = (e as Error).message;
      openSnackBar({ message: result });
    }
  };

  if (active) {
    return (
      <BaseModalWrapper active={active} changeActiveModal={changeActiveModal}>
        <Box m="0 0 15px 0">
          <Box display="flex" justifyContent="space-between" marginBottom="15px">
            <Typography gutterBottom fontSize="28px" fontWeight={500}>
              Введите имя новой задачи
            </Typography>
            <Button size="small" variant="contained" onClick={changeActiveModal}>
              <CloseIcon />
            </Button>
          </Box>
          <Box>
            <TextField
              placeholder="Имя задачи"
              onChange={(e) => changeTaskName(e)}
              value={inputTodo}
              variant="filled"
              fullWidth
            />
          </Box>
        </Box>
        <Box>
          <Button variant="contained" onClick={sendTask}>
            Создать задачу
          </Button>
        </Box>
      </BaseModalWrapper>
    );
  }
};

export default TodoModal;
