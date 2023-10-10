import { ChatsSearchResponse } from '../../../../backend/src/modules/chats/chats.service';
import { WSClientAllChatsEvent } from '../../../../backend/src/utils/websockets/types';
import { FetchStatus } from '../redux/types';

export type InitiialState = {
  chats: WSClientAllChatsEvent['chats'];
  status: FetchStatus;
  errorMessage: string;
  currentChatName: string;
  searchedChats: ChatsSearchResponse;
};

export type UpdateNamePayload = {
  chatId: string;
  name: string;
};
