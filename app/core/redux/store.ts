import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/reducer';
import chatsReducer from '../chats/reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chats: chatsReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // for typed dispatch in hooks.ts
