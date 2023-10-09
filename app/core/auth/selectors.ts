import { AppState } from '../redux/store';

export const authUserIdSelector = (state: AppState) => state.auth.userId;
export const authStatusSelector = (state: AppState) => state.auth.status;
export const authErrorMessageSelector = (state: AppState) => state.auth.errorMessage;
