import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { ILogin, IUser, LoginMutation, RegisterMutation, RegisterResponse } from "../../types";

export const fetchUserLogin = createAsyncThunk<ILogin, string>(
  'users/fetchUserLogin',
  async (userLogin: string) => {
    const response = await axiosApi.get<ILogin>('/users/check/login', { params: { userLogin } });
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