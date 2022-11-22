import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Typography,
  Paper,
} from '@mui/material';
import { tableHeaders } from '../Todo/Todo';
import TableListBody from './TableListBody/TableListBody';
import { ITableLists } from './tableList';
const TableLists: React.FC<ITableLists> = ({ list, currentList, openSnackBar }) => {
  return (
    <>
      <Typography color="white" fontSize="18px" fontWeight={500}>
        Листы
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'gray' }}>
              {tableHeaders.map((element) => (
                <TableCell
                  width={element === 'Название' ? '60%' : '15%'}
                  align={element === 'Название' ? 'left' : 'center'}
                  key={element}>
                  <Typography color="white" fontSize="18px" fontWeight={500}>
                    {element}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((element) => (
              <TableListBody
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
  );
};

export default TableLists;
