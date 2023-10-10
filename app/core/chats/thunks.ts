import { createAsyncThunk } from '@reduxjs/toolkit';
import Config from 'react-native-config';
import { getMessageIfExists } from '../redux/utils/getMessageIfExists';
import { authUserIdSelector } from '../auth/selectors';
import { AppState } from '../redux/store';

export const deleteChat = createAsyncThunk<string, string>(
  'chats/deleteChat',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const userId = authUserIdSelector(getState() as AppState) ?? '';
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