import { ChatType, UserType } from '../chats/types';

export type WSSendMessageEvent = {
  event: 'send_message';
  chatId: string;
  message: string;
};

export type WSAuthEvent = {
  event: 'auth';
  token: string;
};

export type WSAllChatsEvent = {
  event: 'all_chats';
  chats: ChatType[];
};

export type WSReceiveMessageEvent = {
  event: 'receive_message';
  chatId: string;
  id: string;
  message: string;
  sender: UserType;
  createdAt: string;
};

export type WSIncomingEvents = WSAllChatsEvent | WSReceiveMessageEvent;
