import { createSlice } from '@reduxjs/toolkit';
import { GlobalError, ILogin, IUser, ValidationError } from '../../types';
import {
  createUser, editUser,
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
  user: IUser | null;
  detailUser: IUser | null;
  users: IUser[];
  login: ILogin | null;
  message: string;
  fetchLoginLoading: boolean;
  fetchAllUsersLoading: boolean;
  fetchOneUserLoading:boolean;
  registerLoading: boolean;
  registerError: ValidationError | null | GlobalError;
  loginLoading: boolean;
  loginError:  GlobalError | null;
  createLoading:boolean;
  createError: ValidationError | null | GlobalError;
  editLoading: boolean;
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
  registerError: null,
  loginLoading: false,
  createLoading: false,
  createError: null,
  editLoading: false,
  loginError: null
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
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, {payload: userResponse}) => {
      state.registerLoading = false;
      state.user = userResponse.user;
    });
    builder.addCase(register.rejected, (state,  {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(createUser.pending, (state) => {
      state.createLoading = true;
      state.createError = null;
    });
    builder.addCase(createUser.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createUser.rejected, (state, {payload: error}) => {
      state.createLoading = false;
      state.createError = error || null;
    });

    builder.addCase(editUser.pending, (state) => {
      state.editLoading = true;
    });
    builder.addCase(editUser.fulfilled, (state) => {
      state.editLoading = false;
    });
    builder.addCase(editUser.rejected, (state) => {
      state.editLoading = false;
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, {payload: user}) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(login.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
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
export const selectLogin = (state: RootState) => state.users.login;
export const selectMessage = (state: RootState) => state.users.message;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectOneUserLoading = (state: RootState) => state.users.fetchOneUserLoading;
export const selectCreateLoading = (state: RootState) => state.users.createLoading;
export const selectEditUserLoading = (state: RootState) => state.users.editLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectCreateError = (state: RootState) => state.users.createError;
