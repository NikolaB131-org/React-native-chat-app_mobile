import { createAsyncThunk } from '@reduxjs/toolkit';
import Config from 'react-native-config';
import { getMessageIfExists } from '../redux/utils/getMessageIfExists';
import { authUserIdSelector } from '../auth/selectors';
import { AppState } from '../redux/store';
import { UpdateNamePayload } from './types';

export const deleteChat = createAsyncThunk<string, string, { state: AppState }>(
  'chats/deleteChat',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const userId = authUserIdSelector(getState()) ?? '';
      const response = await fetch(`${Config.API_URL_HTTP}/chats/${payload}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${userId}`,
        },
      });
      if (!response.ok) {
        return rejectWithValue((await response.json()).errMessage);
      }
      return payload;
    } catch (error) {
      return rejectWithValue(getMessageIfExists(error));
    }
  },
);

export const leave = createAsyncThunk<string, string, { state: AppState }>(
  'chats/leave',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const userId = authUserIdSelector(getState()) ?? '';
      const response = await fetch(`${Config.API_URL_HTTP}/chats/leave/${payload}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${userId}`,
        },
      });
      if (!response.ok) {
        return rejectWithValue((await response.json()).errMessage);
      }
      return payload;
    } catch (error) {
      return rejectWithValue(getMessageIfExists(error));
    }
  },
);

export const updateName = createAsyncThunk<UpdateNamePayload, UpdateNamePayload, { state: AppState }>(
  'chats/updateName',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const userId = authUserIdSelector(getState()) ?? '';
      const response = await fetch(`${Config.API_URL_HTTP}/chats/${payload.chatId}/?name=${payload.name}`, {
        method: 'PATCH', // CRUD UPDATE
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${userId}`,
        },
      });
      if (!response.ok) {
        return rejectWithValue((await response.json()).errMessage);
      }
      return payload;
    } catch (error) {
      return rejectWithValue(getMessageIfExists(error));
    }
  },
);
