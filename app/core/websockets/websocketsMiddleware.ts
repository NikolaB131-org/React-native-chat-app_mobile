import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { connect, sendMessage } from './reducer';
import { AppDispatch, AppState } from '../redux/store';
import { receiveMessage, setChats } from '../chats/reducer';
import { logout } from '../auth/thunks';
import { WSIncomingEvents, WSAuthEvent, WSSendMessageEvent } from './types';

let ws: WebSocket | null = null;

export const websocketsMiddleware: Middleware = (api: MiddlewareAPI<AppDispatch, AppState>) => next => action => {
  const state = api.getState();
  const dispatch = api.dispatch;

  switch (action.type) {
    case connect.type: {
      onConnect(state, dispatch, next, action);
      break;
    }

    case logout.fulfilled.type: {
      onLogout();
      break;
    }

    case sendMessage.type: {
      onSendMessage(next, action);
      break;
    }
  }

  return next(action);
};

const onConnect = (
  state: AppState,
  dispatch: AppDispatch,
  next: Dispatch<AnyAction>,
  action: ReturnType<typeof connect>,
) => {
  if (ws) {
    return next(action);
  }
  ws = new WebSocket(action.payload);
  const userId = state.auth.userId;

  ws.onopen = () => {
    if (ws && userId) {
      console.log('websocket opened');
      const data: WSAuthEvent = { event: 'auth', token: userId };
      ws.send(JSON.stringify(data));
    }
  };

  ws.onclose = e => {
    console.log('websocket closed, reason:', e.reason);
  };

  ws.onmessage = message => {
    const data: WSIncomingEvents = JSON.parse(message.data.toString());

    switch (data.event) {
      case 'all_chats': {
        dispatch(setChats(data));
        break;
      }
      case 'receive_message': {
        dispatch(receiveMessage(data));
        break;
      }
    }
  };
};

const onLogout = () => {
  if (ws) {
    ws.close(1000, 'logout');
    ws = null;
  }
};

const onSendMessage = (next: Dispatch<AnyAction>, action: ReturnType<typeof sendMessage>) => {
  if (!ws) {
    return next(action);
  }

  const { chatId, message } = action.payload;
  const data: WSSendMessageEvent = { event: 'send_message', chatId, message };
  ws.send(JSON.stringify(data));
};
