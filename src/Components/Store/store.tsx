import { configureStore } from '@reduxjs/toolkit';
import listReducer from './Reducers/lists/listReducer';
import taskReducer from './Reducers/tasks/taskReducer';
import userReducer from './Reducers/user/userReducer';

const store = configureStore({
  devTools: true,
  reducer: {
    listReducer,
    taskReducer,
    userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
