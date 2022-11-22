import React from 'react';
import { IRow } from './row.interface';
import { Box, TableRow, TableCell, Button, Input, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../../Hooks/useTypeSelector';
import { completeTask, deleteTask, updateTask } from '../../HTTP/http.task';
import {
  changeCompleteTask,
  changeNameTask,
  deleteCurrentTask,
} from '../../Store/Reducers/tasks/taskReducer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getLists } from '../../HTTP/http.lists';
import { setLists } from '../../Store/Reducers/lists/listReducer';

const Row: React.FC<IRow> = React.memo(({ element, currentList, openSnackBar }) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [inputName, setInputName] = React.useState<string>(element.name);
  const dispatch = useAppDispatch();

  const changeEdit = () => {
    setIsEdit(true);
  };
  const changeInputName = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputName(e.currentTarget.value);
  };

  const saveNewName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentList === null) return;
    if (inputName.length === 0) {
      openSnackBar({ message: 'Поле не может быть пустым' });
      return;
    }
    try {
      const { status } = await updateTask(element.id, currentList.id, inputName);
      if (status === 200) {
        dispatch(changeNameTask({ id: element.id, newName: inputName }));
        setIsEdit(false);
      }
    } catch (e) {
      const result = (e as Error).message;
      openSnackBar({ message: result });
    }
  };

  const changeComplete = async (id: number) => {
    try {
      const { status } = await completeTask(id);
      if (status === 200) {
        const { data } = await getLists();
        dispatch(setLists(data));
        dispatch(changeCompleteTask(id));
      }
    } catch (e) {
      const result = (e as Error).message;
      openSnackBar({ message: result });
    }
  };

  const removeCurrentTask = async () => {
    try {
      const { status } = await deleteTask(element.id);
      if (status === 204) {
        dispatch(deleteCurrentTask(element.id));
        const { data } = await getLists();
        dispatch(setLists(data));
      }
    } catch (e) {
      const result = (e as Error).message;
      openSnackBar({ message: result });
    }
  };

  return (
    <>
      <TableRow>
        <TableCell align="center" variant="head" color="white">
          <Typography>{element.id}</Typography>
        </TableCell>
        <TableCell onDoubleClick={changeEdit} align="left" variant="head" color="white">
          {isEdit ? (
            <form onSubmit={(e) => saveNewName(e)}>
              <Box display="flex" gap="5px">
                <Input type="text" onChange={(e) => changeInputName(e)} value={inputName} />
                <Button type="submit">Сохранить</Button>
              </Box>
            </form>
          ) : (
            <Box>
              <Typography>{element.name}</Typography>
            </Box>
          )}
        </TableCell>
        <TableCell align="center" variant="head" color="white">
          {element.completed ? (
            <Button variant="contained" disabled>
              <CheckIcon />
            </Button>
          ) : (
            <Button variant="contained" onClick={() => changeComplete(element.id)}>
              <CloseIcon />
            </Button>
          )}
        </TableCell>
        <TableCell align="center" variant="head" color="white">
          <Button variant="contained" onClick={removeCurrentTask}>
            <DeleteIcon />
          </Button>
        </TableCell>
        <TableCell align="center" variant="head" color="white">
          <Button variant="contained" onClick={changeEdit}>
            <EditIcon />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
});

export default Row;
