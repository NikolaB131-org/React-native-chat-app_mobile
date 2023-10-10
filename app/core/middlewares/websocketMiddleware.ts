import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { connect, sendMessage } from '../websocket/reducer';
import { AppDispatch, AppState } from '../redux/store';
import { receiveMessage, set } from '../chats/reducer';
import { WSClientAllEvents, WSServerSendMessageEvent } from '../../../../backend/src/utils/websockets/types';

export const websocketMiddleware: Middleware = (api: MiddlewareAPI<AppDispatch, AppState>) => {
  let ws: WebSocket | null = null;

  return next => action => {
    const state = api.getState();
    switch (action.type) {
      case connect.type: {
        if (ws) {
          return next(action);
        }
        ws = new WebSocket(action.payload);
        const userId = state.auth.userId;

        ws.onopen = () => {
          console.log('websocket opened');
          ws?.send(JSON.stringify({ event: 'auth', token: userId }));
        };

        ws.onclose = e => {
          console.log('websocket closed:', e.reason);
        };

        ws.onmessage = message => {
          const data: WSClientAllEvents = JSON.parse(message.data.toString());

          switch (data.event) {
            case 'all_chats': {
              api.dispatch(set(data));
              break;
            }
            case 'receive_message': {
              api.dispatch(receiveMessage(data));
              break;
            }
          }
        };
        break;
      }
      case sendMessage.type: {
        if (!ws) {
          return next(action);
        }

        const { chatId, message } = action.payload;
        const data: WSServerSendMessageEvent = { event: 'send_message', chatId, message };
        ws.send(JSON.stringify(data));
        break;
      }
    }

    return next(action);
  };
};
