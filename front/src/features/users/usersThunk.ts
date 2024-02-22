import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ILogin, IUser, LoginMutation, RegisterMutation, RegisterResponse } from '../../types';
import { unsetUser } from './usersSlice';

export const fetchUserLogin = createAsyncThunk<ILogin, string>(
  'users/fetchUserLogin',
  async (userLogin: string) => {
    const response = await axiosApi.get<ILogin>('/users/check/login', {params: {userLogin}});
    return response.data;
  }
);

export const fetchUserProfile = createAsyncThunk<IUser>(
  'users/fetchUserProfile',
  async () => {
    const response = await axiosApi.get<IUser>('/users/one/profile');
    return response.data;
  }
);

export const fetchOneUser = createAsyncThunk<IUser, string>(
  'users/fetchOneUser',
  async (id) => {
    const response = await axiosApi.get<IUser>(`/users/${id}`);
    return response.data;
  }
);

export const fetchAllUsers = createAsyncThunk<IUser[]>(
  'users/fetchAllUsers',
  async () => {
    const response = await axiosApi.get<IUser[]>('/users');
    return response.data;
  }
);

export const register = createAsyncThunk<RegisterResponse, RegisterMutation>(
  'users/register',
  async (registerMutation: RegisterMutation) => {
    const formData = new FormData();

    const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];

    keys.forEach((key) => {
      const value = registerMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });
    const response = await axiosApi.post<RegisterResponse>('/users', formData);
    return response.data;
  }
);

export const login = createAsyncThunk<IUser, LoginMutation>(
  'users/login',
  async (loginMutation) => {
    const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
    return response.data.user;
  }
);

export const updateProfilePhoto = createAsyncThunk<void, FormData>(
  'users/updateProfilePhoto',
  async (formData: FormData) => {
    await axiosApi.patch<IUser>('/users/profile/edit-photo', formData);
  }
);

export const resetPassword = createAsyncThunk<{ message: string }, string>(
  'users/resetPassword',
  async (password: string) => {
    const response = await axiosApi.patch('/users/profile/reset-password', {password});
    return response.data
  }
);

export const authorizeUser = createAsyncThunk<void, string>(
  'users/authorizeUser',
  async (id) => {
    await axiosApi.patch(`/users/${id}/authorize`);
  }
);

export const resetDefaultPassword = createAsyncThunk<void, string>(
  'users/resetDefaultPassword',
  async (id) => {
    await axiosApi.patch(`/users/reset-password/${id}`);
  }
);

export const logout = createAsyncThunk<void, void>(
  'users/logout',
  async (_, {dispatch}) => {
    await axiosApi.delete('/users/change/logout');
    dispatch(unsetUser());
  });

export const deleteUser = createAsyncThunk<void, string>(
  'users/deleteUser',
  async (id) => {
    await axiosApi.delete(`/users/${id}`);
  });

