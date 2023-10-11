import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/reducer';
import chatsReducer from '../chats/reducer';
import websocketsReducer from '../websockets/reducer';
import { websocketsMiddleware } from '../websockets/websocketsMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chats: chatsReducer,
    websockets: websocketsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(websocketsMiddleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // for typed dispatch in hooks.ts
