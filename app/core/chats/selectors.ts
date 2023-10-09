import { AppState } from '../redux/store';

export const chatsChatsSelector = (state: AppState) => state.chats.chats;
export const chatsStatusSelector = (state: AppState) => state.chats.status;
export const chatsErrorMessageSelector = (state: AppState) => state.chats.errorMessage;
