import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  focusTasks : [{
      id:1,
      task:'Coding',
      sets : 4,
      currentSet : 0,
      hour: 2,
  }],
};

export const focusSlice = createSlice({
  name: 'focus',
  initialState,
  reducers: {
    setFocusTasks: (state, action) => {
      state.focusTasks = [...state.focusTasks,action.payload]
    },
    IncreaseStep: (state,action) => {
      const {id} = action.payload;
      state.focusTasks = state.focusTasks.map((item)=>{
          if(item.id === id){
              return {...item,currentSet: item.currentSet + 1}
          }
      })
    },
  },
});

export const { setFocusTasks, IncreaseStep } = focusSlice.actions;
export default focusSlice.reducer;
