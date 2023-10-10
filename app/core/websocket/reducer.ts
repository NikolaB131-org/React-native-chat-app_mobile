/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'websocket',
  initialState: {},
  reducers: {
    connect(state, action: PayloadAction<string>) {},
    sendMessage(state, action: PayloadAction<{ chatId: string; message: string }>) {},
  },
});

export const { connect, sendMessage } = slice.actions;

export default slice.reducer;
