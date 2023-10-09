import { WSClientAllEvents } from '../../../../backend/src/utils/websockets/types';
import { addMessageToChat, setChats } from '../chats/reducer';
import { AppDispatch } from '../redux/store';

const start = (ws: WebSocket, dispatch: AppDispatch, userId: string) => {
  ws.onopen = () => {
    console.log('websocket opened');
    ws.send(JSON.stringify({ event: 'auth', token: userId }));
  };

  ws.onclose = e => {
    console.log('websocket closed:', e.reason);
  };

  ws.onmessage = message => {
    const data: WSClientAllEvents = JSON.parse(message.data.toString());

    switch (data.event) {
      case 'all_chats': {
        dispatch(setChats(data));
        break;
      }
      case 'receive_message': {
        dispatch(addMessageToChat(data));
        break;
      }
    }
  };
};

export default {
  start,
};
