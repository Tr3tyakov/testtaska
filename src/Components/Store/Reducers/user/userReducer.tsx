import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../user/state';

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeAuth: (state, action) => {
      return { ...state, isAuth: action.payload };
    },

    setUser: (state, action) => {
      return { ...state, user: action.payload };
    },
  },
});

export const { changeAuth, setUser } = userReducer.actions;

export default userReducer.reducer;
