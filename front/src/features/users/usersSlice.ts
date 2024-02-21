import { createSlice } from '@reduxjs/toolkit';
import { ILogin, IUser } from '../../types';
import { fetchUserLogin, login, register } from './usersThunk';
import { RootState } from '../../app/store';

interface UserState {
  user: IUser | null,
  login: ILogin | null;
  fetchLoginLoading: boolean;
  registerLoading: boolean,
  registerError: boolean,
  loginLoading: boolean,
}

const initialState: UserState = {
  user: null,
  login: null,
  fetchLoginLoading: false,
  registerLoading: false,
  registerError: false,
  loginLoading: false
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserLogin.pending, (state) => {
      state.fetchLoginLoading = true;
    });
    builder.addCase(fetchUserLogin.fulfilled, (state, {payload: login}) => {
      state.fetchLoginLoading = false;
      state.login = login;
    });
    builder.addCase(fetchUserLogin.rejected, (state) => {
      state.fetchLoginLoading = false;
    });

    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = false;
    });
    builder.addCase(register.fulfilled, (state, {payload: userResponse}) => {
      state.registerLoading = false;
      state.user = userResponse.user;
    });
    builder.addCase(register.rejected, (state) => {
      state.registerLoading = false;
      state.registerError = true;
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(login.fulfilled, (state, {payload: user}) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(login.rejected, (state) => {
      state.loginLoading = false;
    });
  }
});

export const usersReducer = usersSlice.reducer;
export const {unsetUser} = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export const selectLogin = (state: RootState) => state.users.login;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
