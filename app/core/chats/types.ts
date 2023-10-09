import { WSClientAllChatsEvent } from '../../../../backend/src/utils/websockets/types';
import { FetchStatus } from '../redux/types';

export type InitiialState = {
  chats: WSClientAllChatsEvent['chats'] | null;
  status: FetchStatus;
  errorMessage: string;
};
