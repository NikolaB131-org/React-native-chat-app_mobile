import { FetchStatus } from '../redux/types';

export type InitiialState = {
  userId: string | null;
  status: FetchStatus;
  errorMessage: string;
};

export type LoginPayload = {
  username: string;
};
