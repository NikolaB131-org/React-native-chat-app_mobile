import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginPayload } from './types';
import Config from 'react-native-config';
import { getMessageIfExists } from '../redux/utils/getMessageIfExists';
import Keychain from 'react-native-keychain';

export const login = createAsyncThunk<string, LoginPayload>('auth/login', async (payload, { rejectWithValue }) => {
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
    const userId = (await response.json()).userId;
    await Keychain.setGenericPassword(userId, '1');
    console.log('Credentials saved');
    return userId;
  } catch (error) {
    return rejectWithValue(getMessageIfExists(error));
  }
});

export const logout = createAsyncThunk<void, void>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await Keychain.resetGenericPassword();
    console.log('Credentials deleted');
  } catch (error) {
    return rejectWithValue(getMessageIfExists(error));
  }
});
