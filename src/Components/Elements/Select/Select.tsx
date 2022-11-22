import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ISelect } from './select.interface';
import { useAppDispatch, useAppSelector } from '../../Hooks/useTypeSelector';
import { changeCurrentList } from '../../Store/Reducers/lists/listReducer';

const Selection: React.FC<ISelect> = ({ list }) => {
  const { currentList } = useAppSelector(({ listReducer }) => {
    return {
      currentList: listReducer.currentList,
    };
  });

  const dispatch = useAppDispatch();

  const handleChange = (e: any) => {
    dispatch(changeCurrentList(e.target.value));
  };

  return (
    <Box width="100%">
      <FormControl fullWidth>
        <InputLabel id="input">List</InputLabel>
        <Select
          labelId="input"
          id="input"
          value={currentList ? currentList.name : ''}
          label="List"
          onChange={handleChange}>
          {list.map((element) => (
            <MenuItem key={element.id} value={element.name}>
              {element.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Selection;
