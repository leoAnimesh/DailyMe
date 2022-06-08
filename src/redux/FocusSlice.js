import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  focusTasks: [],
};

export const focusSlice = createSlice({
  name: 'focus',
  initialState,
  reducers: {
    setFocusTasks: (state, action) => {
      state.focusTasks = [...state.focusTasks, action.payload];
    },
    IncreaseStep: (state, action) => {
      const { id } = action.payload;
      state.focusTasks = state.focusTasks.map((item) => {
        if (item.id === id) {
          return { ...item, currentSet: item.currentSet + 1 };
        }
        return item;
      });
    },
    AddFocusTask: (state, action) => {
      state.focusTasks = [...state.focusTasks, action.payload];
    },
    getFocusTasks: (state, action) => {
      state.focusTasks = action.payload;
    },
    resetFocusState: () => {
      return initialState;
    },
    deleteFocusTask: (state, action) => {
      const { id } = action.payload;
      state.focusTasks = state.focusTasks.filter((focus) => focus.id !== id);
    },
  },
});

export const {
  setFocusTasks,
  IncreaseStep,
  AddFocusTask,
  getFocusTasks,
  resetFocusState,
  deleteFocusTask,
} = focusSlice.actions;
export default focusSlice.reducer;
