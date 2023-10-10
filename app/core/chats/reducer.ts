import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitiialState } from './types';
import { WSClientAllChatsEvent, WSClientReceiveMessageEvent } from '../../../../backend/src/utils/websockets/types';
import { deleteChat, leave } from './thunks';

const initialState: InitiialState = {
  chats: [],
  status: 'idle',
  errorMessage: '',
};

const slice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<InitiialState['status']>) {
      state.status = action.payload;
    },
    set(state, action: PayloadAction<WSClientAllChatsEvent>) {
      state.chats = action.payload.chats;
    },
    receiveMessage(state, action: PayloadAction<WSClientReceiveMessageEvent>) {
      const data = action.payload;
      if (state.chats) {
        const chatIndex = state.chats.findIndex(chat => chat.id === data.chatId);
        const { id, message, sender, createdAt } = data;
        state.chats[chatIndex].messages = [...state.chats[chatIndex].messages, { id, message, sender, createdAt }];
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(deleteChat.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        const deletedChatId = action.payload;
        if (state.chats) {
          state.chats = state.chats.filter(chat => chat.id !== deletedChatId);
        }
        state.status = 'idle';
      })
      .addCase(deleteChat.rejected, (state, action) => {
        state.status = 'failed';
        if (typeof action.payload === 'string') {
          state.errorMessage = action.payload;
        } else {
          state.errorMessage = 'An error occurred while deleting chat';
        }
      })
      .addCase(leave.pending, state => {
        state.status = 'loading';
      })
      .addCase(leave.fulfilled, (state, action) => {
        const leavedChatId = action.payload;
        if (state.chats) {
          state.chats = state.chats.filter(chat => chat.id !== leavedChatId);
        }
        state.status = 'idle';
      })
      .addCase(leave.rejected, (state, action) => {
        state.status = 'failed';
        if (typeof action.payload === 'string') {
          state.errorMessage = action.payload;
        } else {
          state.errorMessage = 'An error occurred while deleting chat';
        }
      });
  },
});

export const { setStatus, set, receiveMessage } = slice.actions;

export default slice.reducer;
