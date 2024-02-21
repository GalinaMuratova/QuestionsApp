import axios, { AxiosHeaders } from 'axios';
import { RootState } from './app/store';
import { Store } from '@reduxjs/toolkit';

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config) => {
    const token = store.getState().users.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', token);

    return config;
  });
};

const axiosApi = axios.create({
  baseURL: 'http://localhost:8000',
});

export default axiosApi;