import { FetchStatus } from '../redux/types';

export type UserType = {
  id: string;
  username: string;
  joinedChats: ChatType[];
};

export type MessageType = {
  id: string;
  message: string;
  sender: UserType;
  createdAt: string;
};

export type ChatType = {
  id: string;
  imageUrl?: string;
  name: string;
  creatorId: string;
  users: UserType[];
  messages: MessageType[];
};

export type InitiialState = {
  chats: ChatType[];
  status: FetchStatus;
  errorMessage: string;
  currentChatName: string;
  searchedChats: ChatType[];
};

export type UpdateNamePayload = {
  chatId: string;
  name: string;
};
