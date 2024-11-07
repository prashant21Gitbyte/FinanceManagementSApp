// features/userSlice.js
import {createSlice} from '@reduxjs/toolkit';

// Initial state for the user slice
const initialState = {
  name: undefined,
  age: 0,
  isLoggedIn: false,
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.isLoggedIn = true;
    },
    logout: state => {
      state.name = '';
      state.age = 0;
      state.isLoggedIn = false;
    },
  },
});

// Export the actions
export const {login, logout} = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
