import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Button,
  Paper,
} from '@mui/material';
import HeaderLayouts from '../Layouts/HeaderLayouts';
import AddIcon from '@mui/icons-material/Add';
import { getTasks } from '../HTTP/http.task';
import { getLists } from '../HTTP/http.lists';
import ListsTodo from '../ListsTodo/ListsTodo';
import { useAppDispatch, useAppSelector } from '../Hooks/useTypeSelector';
import { setLists } from '../Store/Reducers/lists/listReducer';
import { setTasks } from '../Store/Reducers/tasks/taskReducer';
import TodoModal from '../Elements/Modals/TodoModal';
import Row from './Row/Row';
import TableLists from '../TableLists/TableLists';
import { useSnackBar } from '../Hooks/snackBar';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
export const tableHeaders = ['ID', 'Название', 'Завершенность', 'Удалить', 'Редактировать'];

const Todo = () => {
  const [isOpenTable, setIsOpenTable] = React.useState<boolean>(false);
  const { snackBar, openSnackBar, closeSnackBar } = useSnackBar();

  const { tasks, lists, currentList } = useAppSelector(({ listReducer, taskReducer }) => {
    return {
      lists: listReducer.lists,
      currentList: listReducer.currentList,
      tasks: taskReducer.tasks,
    };
  });

  const dispatch = useAppDispatch();
  const [modal, setOpenModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getAllList = async () => {
      try {
        const { data } = await getLists();
        dispatch(setLists(data));
      } catch (e) {
        const result = (e as Error).message;
        openSnackBar({ message: result });
      }
    };
    getAllList();
  }, []);

  React.useEffect(() => {
    if (!currentList) return;
    const getAllTask = async () => {
      try {
        const { data } = await getTasks(currentList.id);
        dispatch(setTasks(data));
      } catch (e) {
        const result = (e as Error).message;
        openSnackBar({ message: result });
      }
    };
    getAllTask();
  }, [currentList]);

  const openModal = () => {
    setOpenModal(!modal);
  };
  const changeOpenTableLists = () => {
    setIsOpenTable(!isOpenTable);
  };
  return (
    <HeaderLayouts openSnackbar={openSnackBar}>
      <Snackbar
        open={snackBar.open}
        autoHideDuration={6000}
        onClose={closeSnackBar}
        message={snackBar.message}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackBar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      <ListsTodo
        currentList={currentList}
        lists={lists}
        changeOpenTableLists={changeOpenTableLists}
        isOpenTable={isOpenTable}
        openSnackBar={openSnackBar}
      />

      {isOpenTable && (
        <Box m="0 0 15px">
          <TableLists currentList={currentList} list={lists} openSnackBar={openSnackBar} />
        </Box>
      )}
      <Box display="flex" alignItems="flex-start" flexDirection="column">
        <TodoModal
          active={modal}
          openSnackBar={openSnackBar}
          changeActiveModal={openModal}
          currentList={currentList}
        />
        <Button variant="contained" onClick={openModal}>
          <Typography>Создать задачу</Typography>
          <AddIcon />
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" height="100%">
        <Typography gutterBottom fontSize="35px" fontWeight={500} color="white"></Typography>
        {tasks.length ? (
          <>
            <Typography color="white" fontSize="18px" fontWeight={500}>
              Задачи
            </Typography>
            <TableContainer sx={{ height: 'max-content' }} component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'gray' }}>
                    {tableHeaders.map((title) => (
                      <TableCell
                        width={title === 'Название' ? '60%' : '15%'}
                        align={title === 'Название' ? 'left' : 'center'}
                        variant="head"
                        color="white"
                        key={title}>
                        <Typography color="white" fontSize="18px" fontWeight={500}>
                          {title}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((element) => (
                    <Row
                      key={element.id}
                      element={element}
                      currentList={currentList}
                      openSnackBar={openSnackBar}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Paper>
            <Box height="50px" display="flex" alignItems="center" p="0 10px">
              <Typography fontSize="16px">В данном листе нет задач</Typography>
            </Box>
          </Paper>
        )}
      </Box>
    </HeaderLayouts>
  );
};

export default Todo;
