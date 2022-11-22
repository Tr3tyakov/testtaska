import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../tasks/state';

export const taskReducer = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      return { ...state, tasks: action.payload };
    },

    createNewTask: (state, action) => {
      return { ...state, tasks: [...state.tasks, action.payload] };
    },

    changeNameTask: (state, action) => {
      return {
        ...state,
        tasks: state.tasks.map((element) =>
          element.id === action.payload.id ? { ...element, name: action.payload.newName } : element,
        ),
      };
    },

    changeCompleteTask: (state, action) => {
      return {
        ...state,
        tasks: state.tasks.map((element) =>
          element.id === action.payload ? { ...element, completed: !element.completed } : element,
        ),
      };
    },

    deleteCurrentTask: (state, action) => {
      return { ...state, tasks: state.tasks.filter((element) => element.id !== action.payload) };
    },

    removeTasks: (state, action) => {
      return {
        ...state,
        tasks: action.payload,
      };
    },
  },
});

export const {
  setTasks,
  changeCompleteTask,
  changeNameTask,
  createNewTask,
  removeTasks,
  deleteCurrentTask,
} = taskReducer.actions;

export default taskReducer.reducer;
