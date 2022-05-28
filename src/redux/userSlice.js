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
      state.user = action.payload;
      state.authenticated = true;
    },
    clearUser: () => {
      return initialState;
    }
  },
});

export const { setAuth,clearUser } = userSlice.actions;
export default userSlice.reducer;
