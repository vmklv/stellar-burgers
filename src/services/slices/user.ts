import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { loginUserApi, getUserApi, logoutApi, TLoginData } from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  userRequest: boolean;
  userFailed: boolean;
};

const initialState: TUserState = {
  user: null,
  userRequest: false,
  userFailed: false
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (form: TLoginData) => {
    const data = await loginUserApi(form);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const data = await getUserApi();
  return data.user;
});

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.userRequest = true;
        state.userFailed = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userRequest = false;
        state.userFailed = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.userRequest = false;
        state.userFailed = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const userReducer = userSlice.reducer;
