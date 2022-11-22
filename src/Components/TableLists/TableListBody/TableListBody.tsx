import React from 'react';
import { Box, Typography, TableRow, TableCell, Button, Input } from '@mui/material';
import { ITableBody } from './tableListBody.interface';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from '../../Hooks/useTypeSelector';
import { deleteList, getLists, updateList } from '../../HTTP/http.lists';
import { removeTasks } from '../../Store/Reducers/tasks/taskReducer';
import { removeList, setLists, updateCurrentList } from '../../Store/Reducers/lists/listReducer';

const TableListBody: React.FC<ITableBody> = ({ element, currentList, openSnackBar }) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>(element.name);

  const dispatch = useAppDispatch();

  const deleteCurrentList = async () => {
    try {
      const { status } = await deleteList(element.id);
      if (status === 204) {
        if (currentList?.id === element.id) {
          dispatch(removeTasks([]));
        }
        dispatch(removeList(element.id));
      }
    } catch (e) {
      const result = (e as Error).message;
      openSnackBar({ message: result });
    }
  };

  const changeTitleList = async (e?: React.FormEvent<HTMLFormElement> | undefined) => {
    if (e) {
      e.preventDefault();
    }
    if (inputValue.length === 0) {
      openSnackBar({ message: 'Поле не может быть пустым' });

      return;
    }
    const { status } = await updateList(element.id, inputValue);
    if (status === 200) {
      dispatch(updateCurrentList({ id: element.id, name: inputValue }));
      changeEdit();
    }
  };

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const changeEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    <TableRow>
      <TableCell align="center">{element.id}</TableCell>
      <TableCell>
        {isEdit ? (
          <form onSubmit={(e) => changeTitleList(e)}>
            <Box display="flex" gap="5px">
              <Input type="text" value={inputValue} onChange={(e) => changeInputValue(e)} />
              <Button variant="contained" onClick={() => changeTitleList()}>
                <CheckIcon />
              </Button>
            </Box>
          </form>
        ) : (
          <Typography onDoubleClick={changeEdit} align="left">
            {element.name}
          </Typography>
        )}
      </TableCell>
      <TableCell align="center">
        <Box position="relative">
          <CircularProgress
            variant="determinate"
            color="primary"
            value={element.completion_progress}
          />
          <Box className="progress__bar">
            <Typography fontSize="12px" fontWeight={600} color="black">
              {element.completion_progress}%
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">
        <Button variant="contained" onClick={deleteCurrentList}>
          <DeleteIcon />
        </Button>
      </TableCell>
      <TableCell align="center">
        <Button variant="contained" onClick={changeEdit}>
          <EditIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TableListBody;
