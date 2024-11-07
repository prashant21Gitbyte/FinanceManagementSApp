// store.js
import {configureStore} from '@reduxjs/toolkit'; // Import configureStore from Redux Toolkit
import userReducer from './features/userSlice'; // Import the user slice you will create

// Create the store and add reducers
const store = configureStore({
  reducer: {
    user: userReducer, // This will be the name of the slice and the reducer function
  },
});

export default store;
