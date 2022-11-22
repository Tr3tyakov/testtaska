import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { IListModal } from './modal.interface';
import { createTodoList } from '../../HTTP/http.lists';
import { useAppDispatch } from '../../Hooks/useTypeSelector';
import { addList } from '../../Store/Reducers/lists/listReducer';
import BaseModalWrapper from './BaseModal';
import CloseIcon from '@mui/icons-material/Close';

const ListModal: React.FC<IListModal> = ({ active, changeActiveModal, openSnackBar }): any => {
  const [inputList, setInputList] = React.useState<string>('');

  const changeTaskName = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputList(e.currentTarget.value);
  };

  const createNewList = async () => {
    try {
      if (inputList.length === 0) {
        openSnackBar({ message: 'Имя листа не может быть пустым' });
        return;
      }
      const { data, status } = await createTodoList(inputList);
      if (status === 201) {
        dispatch(addList(data));
        setInputList('');
        changeActiveModal();
      }
    } catch (e) {
      const result = (e as Error).message;
      openSnackBar({ message: result });
    }
  };
  const dispatch = useAppDispatch();

  if (active) {
    return (
      <BaseModalWrapper active={active} changeActiveModal={changeActiveModal}>
        <Box>
          <Box display="flex" justifyContent="space-between" marginBottom="15px">
            <Typography gutterBottom fontSize="28px" fontWeight={500}>
              Введите имя новому листу
            </Typography>
            <Button size="small" variant="contained" onClick={changeActiveModal}>
              <CloseIcon />
            </Button>
          </Box>
          <Box m="0 0 15px 0">
            <TextField
              placeholder="Название"
              onChange={(e) => changeTaskName(e)}
              value={inputList}
              variant="filled"
              fullWidth
            />
          </Box>
        </Box>
        <Box>
          <Button variant="contained" onClick={createNewList}>
            Создать новый лист
          </Button>
        </Box>
      </BaseModalWrapper>
    );
  }
};

export default ListModal;
