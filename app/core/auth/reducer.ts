import { createSlice } from '@reduxjs/toolkit';
import { InitiialState } from './types';
import { login } from './thunks';

const initialState: InitiialState = {
  userId: null,
  status: 'idle',
  errorMessage: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
      });
  },
});

export default slice.reducer;
