import { createSlice } from '@reduxjs/toolkit';
import { IInitialState, initialState } from './state';

export const listReducer = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setLists: (state, action) => {
      return { ...state, lists: action.payload };
    },

    addList: (state, action) => {
      return { ...state, lists: [...state.lists, action.payload] };
    },

    changeCurrentList: (state, action) => {
      const newCurrentList = state.lists.find((element) => element.name === action.payload);
      return { ...state, currentList: newCurrentList };
    },

    removeList: (state, action) => {
      return { ...state, lists: state.lists.filter((element) => element.id !== action.payload) };
    },
    updateCurrentList: (state, action) => {
      return {
        ...state,
        lists: state.lists.map((element) =>
          element.id === action.payload.id ? { ...element, name: action.payload.name } : element,
        ),
      };
    },
  },
});

export const { setLists, changeCurrentList, removeList, addList, updateCurrentList } =
  listReducer.actions;

export default listReducer.reducer;
