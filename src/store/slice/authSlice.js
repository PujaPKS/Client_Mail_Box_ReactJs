
import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'; // Imported jwtDecode from jwt-decode library

// Initial state
const tokenFromStorage = localStorage.getItem('idToken');
const decodedToken = tokenFromStorage ? jwtDecode(tokenFromStorage) : null;

const initialState = {
  token: localStorage.getItem('idToken') || null,
  isLoggedIn: !!localStorage.getItem('idToken'),
  email: decodedToken ? decodedToken.email : '', // Extracted email from token
};

// Created a slice of the state
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload;
      state.token = token;
      state.isLoggedIn = true;
      localStorage.setItem('idToken', token);

      // Decoding token to get email
      try {
        const decoded = jwtDecode(token);
        state.email = decoded.email || '';
      } catch (error) {
        console.error('Error decoding token:', error);
        state.email = '';
      }

    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.email = ''; // Cleared email on logout
      localStorage.removeItem('idToken');
    },
  },
});

// Exported actions to dispatch from components
export const { login, logout } = authSlice.actions;

// Exported the reducer to be used in the store
export default authSlice.reducer;
