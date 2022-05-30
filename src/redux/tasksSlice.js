import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    taskCompleted: (state, action) => {
      const { id, completed } = action.payload;
      state.tasks = state.tasks.map((task) => {
        if (task.id === id) {
          task.completed = completed;
        }
        return task;
      });
    },
    deleteTask: (state, action) => {
      const { id } = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    getTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, taskCompleted, getTasks, deleteTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;