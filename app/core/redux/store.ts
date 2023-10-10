import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/reducer';
import chatsReducer from '../chats/reducer';
import websocketReducer from '../websocket/reducer';
import { websocketMiddleware } from '../middlewares/websocketMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chats: chatsReducer,
    websocket: websocketReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(websocketMiddleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // for typed dispatch in hooks.ts
