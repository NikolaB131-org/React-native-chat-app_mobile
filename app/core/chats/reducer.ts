import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitiialState } from './types';
import { WSClientAllChatsEvent, WSClientReceiveMessageEvent } from '../../../../backend/src/utils/websockets/types';

const initialState: InitiialState = {
  chats: [],
  status: 'idle',
  errorMessage: '',
};

const slice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<WSClientAllChatsEvent>) {
      state.chats = action.payload.chats;
    },
    addMessageToChat(state, action: PayloadAction<WSClientReceiveMessageEvent>) {
      const data = action.payload;
      if (state.chats) {
        const chatIndex = state.chats.findIndex(chat => chat.id === data.chatId);
        const { id, message, sender, createdAt } = data;
        state.chats[chatIndex].messages = [...state.chats[chatIndex].messages, { id, message, sender, createdAt }];
      }
    },
  },
});

export const { setChats, addMessageToChat } = slice.actions;

export default slice.reducer;
