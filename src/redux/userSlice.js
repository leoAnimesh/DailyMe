import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  authenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.authenticated = action.payload;
    },
  },
});

export const { setAuth } = userSlice.actions;
export default userSlice.reducer;
