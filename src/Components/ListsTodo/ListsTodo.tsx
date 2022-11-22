import React from 'react';
import Selection from '../Elements/Select/Select';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { IListsTodo } from './listsTodo.interface';
import ListModal from '../Elements/Modals/ListModal';

const ListsTodo: React.FC<IListsTodo> = React.memo(
  ({ lists, changeOpenTableLists, isOpenTable, openSnackBar }) => {
    const [modal, setModal] = React.useState<boolean>(false);

    const openModal = () => {
      setModal(!modal);
    };

    const arrayListsIsEmpty = lists.length === 0 ? true : false;

    return (
      <Box
        display="flex"
        alignItems="flex-start"
        flexDirection="column-reverse"
        gap="10px"
        marginBottom="20px">
        <ListModal active={modal} changeActiveModal={openModal} openSnackBar={openSnackBar} />
        {arrayListsIsEmpty ? (
          <Typography>Создайте новый лист</Typography>
        ) : (
          <>
            <Box display="flex" gap="10px" width="100%" alignItems="center">
              <Selection list={lists} />
              <Box margin="10px 0 10px 0">
                <Button className="white__space" variant="contained" onClick={changeOpenTableLists}>
                  {isOpenTable ? 'Cкрыть листы задач' : 'Показать листы задач'}
                </Button>
              </Box>
            </Box>
            <Typography color="white" fontSize="18px" fontWeight={500}>
              Конкретный лист
            </Typography>
          </>
        )}
        <Box>
          <Button className="white__space" size="medium" variant="contained" onClick={openModal}>
            <Typography>Создать лист</Typography>
            <AddIcon />
          </Button>
        </Box>
      </Box>
    );
  },
);

export default ListsTodo;
