import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitiialState } from './types';
import { login, logout } from './thunks';

const initialState: InitiialState = {
  userId: null,
  status: 'idle',
  errorMessage: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.userId = action.payload;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        if (typeof action.payload === 'string') {
          state.errorMessage = action.payload;
        } else {
          state.errorMessage = 'An error occurred while logging in';
        }
      })
      .addCase(logout.pending, state => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, state => {
        state.status = 'idle';
        state.userId = null;
        state.errorMessage = '';
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        if (typeof action.payload === 'string') {
          state.errorMessage = action.payload;
        } else {
          state.errorMessage = 'An error occurred while logging in';
        }
      });
  },
});

export const { setUserId } = slice.actions;

export default slice.reducer;
