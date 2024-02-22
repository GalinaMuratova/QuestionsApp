import { createSlice } from '@reduxjs/toolkit';
import { ILogin, IUser } from '../../types';
import {
  fetchAllUsers,
  fetchOneUser,
  fetchUserLogin,
  fetchUserProfile,
  login,
  register,
  resetPassword
} from './usersThunk';
import { RootState } from '../../app/store';

interface UserState {
  user: IUser | null,
  detailUser: IUser | null,
  users: IUser[],
  login: ILogin | null;
  message: string;
  fetchLoginLoading: boolean;
  fetchAllUsersLoading: boolean;
  fetchOneUserLoading:boolean;
  registerLoading: boolean,
  registerError: boolean,
  loginLoading: boolean,
}

const initialState: UserState = {
  user: null,
  detailUser: null,
  users: [],
  login: null,
  message: '',
  fetchAllUsersLoading: false,
  fetchOneUserLoading: false,
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
    clearMessage(state) {
      state.message = '';
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

    builder.addCase(fetchAllUsers.pending, (state) => {
      state.fetchAllUsersLoading = true;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, {payload: users}) => {
      state.fetchAllUsersLoading = false;
      state.users = users;
    });
    builder.addCase(fetchAllUsers.rejected, (state) => {
      state.fetchAllUsersLoading = false;
    });

    builder.addCase(fetchOneUser.pending, (state) => {
      state.fetchOneUserLoading = true;
    });
    builder.addCase(fetchOneUser.fulfilled, (state, {payload: user}) => {
      state.fetchOneUserLoading = false;
      state.detailUser = user;
    });
    builder.addCase(fetchOneUser.rejected, (state) => {
      state.fetchOneUserLoading = false;
    });

    builder.addCase(fetchUserProfile.pending, (state) => {
      state.fetchLoginLoading = true;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, {payload: profile}) => {
      state.fetchLoginLoading = false;
      state.user = profile;
    });
    builder.addCase(fetchUserProfile.rejected, (state) => {
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

    builder.addCase(resetPassword.pending, (state) => {
      state.message = '';
    });
    builder.addCase(resetPassword.fulfilled, (state, {payload: message}) => {
      state.message = message.message;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.message = 'Error';
    });
  }
});

export const usersReducer = usersSlice.reducer;
export const {unsetUser} = usersSlice.actions;
export const {clearMessage} = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export const selectDetailUser = (state: RootState) => state.users.detailUser;
export const selectAllUsers = (state: RootState) => state.users.users;
export const selectOneUserLoading = (state: RootState) => state.users.fetchOneUserLoading;
export const selectLogin = (state: RootState) => state.users.login;
export const selectMessage = (state: RootState) => state.users.message;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
