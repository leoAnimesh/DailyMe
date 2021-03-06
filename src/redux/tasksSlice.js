import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    taskCompleted: (state, action) => {
      const { id, completed } = action.payload;
      state.tasks = state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: completed };
        }
        return task;
      });
    },
    updateTask: (state, action) => {
      const { id, data } = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
      state.tasks = [...state.tasks, data];
    },
    deleteTask: (state, action) => {
      const { id } = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    getTasks: (state, action) => {
      state.tasks = action.payload;
    },
    resetTasksState: () => {
      return initialState;
    },
  },
});

export const {
  addTask,
  taskCompleted,
  getTasks,
  deleteTask,
  updateTask,
  resetTasksState,
} = tasksSlice.actions;
export default tasksSlice.reducer;
