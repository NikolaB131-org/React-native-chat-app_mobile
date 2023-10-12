import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitiialState } from './types';
import { WSAllChatsEvent, WSReceiveMessageEvent } from '../websockets/types';
import { create, deleteChat, join, leave, search, updateName } from './thunks';
import { logout } from '../auth/thunks';

const initialState: InitiialState = {
  chats: [],
  status: 'idle',
  errorMessage: '',
  currentChatName: '',
  searchedChats: [],
};

const slice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<InitiialState['status']>) {
      state.status = action.payload;
    },
    setChats(state, action: PayloadAction<WSAllChatsEvent>) {
      state.chats = action.payload.chats;
    },
    receiveMessage(state, action: PayloadAction<WSReceiveMessageEvent>) {
      const data = action.payload;
      const chatIndex = state.chats.findIndex(chat => chat.id === data.chatId);
      const { id, message, sender, createdAt } = data;
      state.chats[chatIndex].messages = [...state.chats[chatIndex].messages, { id, message, sender, createdAt }];
    },
    setCurrentChatName(state, action: PayloadAction<InitiialState['currentChatName']>) {
      state.currentChatName = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logout.fulfilled.type, state => {
        state.chats = [];
        state.errorMessage = '';
        state.currentChatName = '';
        state.searchedChats = [];
      })
      .addCase(create.pending, state => {
        state.status = 'loading';
      })
      .addCase(create.fulfilled, (state, action) => {
        state.chats = [...state.chats, action.payload];
        state.status = 'idle';
      })
      .addCase(create.rejected, (state, action) => {
        state.status = 'failed';
        if (typeof action.payload === 'string') {
          state.errorMessage = action.payload;
        } else {
          state.errorMessage = 'An error occurred while deleting chat';
        }
      })
      .addCase(updateName.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateName.fulfilled, (state, action) => {
        const { chatId, name } = action.payload;
        state.chats = state.chats.map(chat => (chat.id === chatId ? { ...chat, name } : chat));
        state.currentChatName = name;
        state.status = 'idle';
      })
      .addCase(updateName.rejected, (state, action) => {
        state.status = 'failed';
        if (typeof action.payload === 'string') {
          state.errorMessage = action.payload;
        } else {
          state.errorMessage = 'An error occurred while deleting chat';
        }
      })
      .addCase(deleteChat.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        const deletedChatId = action.payload;
        state.chats = state.chats.filter(chat => chat.id !== deletedChatId);
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
      .addCase(search.pending, state => {
        state.status = 'loading';
      })
      .addCase(search.fulfilled, (state, action) => {
        state.searchedChats = action.payload;
        state.status = 'idle';
      })
      .addCase(search.rejected, (state, action) => {
        state.status = 'failed';
        if (typeof action.payload === 'string') {
          state.errorMessage = action.payload;
        } else {
          state.errorMessage = 'An error occurred while searching for chats';
        }
      })
      .addCase(join.pending, state => {
        state.status = 'loading';
      })
      .addCase(join.fulfilled, (state, action) => {
        state.chats = [...state.chats, action.payload];
        state.status = 'idle';
      })
      .addCase(join.rejected, (state, action) => {
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
        state.chats = state.chats.filter(chat => chat.id !== leavedChatId);
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

export const { setStatus, setChats, receiveMessage, setCurrentChatName } = slice.actions;

export default slice.reducer;
