import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginPayload } from './types';
import Config from 'react-native-config';
import { getMessageIfExists } from '../redux/utils/getMessageIfExists';

export const login = createAsyncThunk<string | void, LoginPayload>(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Config.API_URL_HTTP}/auth/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: payload.username }),
      });

      if (!response.ok) {
        return rejectWithValue((await response.json()).errMessage);
      }
      return (await response.json()).userId;
    } catch (error) {
      return rejectWithValue(getMessageIfExists(error));
    }
  },
);
