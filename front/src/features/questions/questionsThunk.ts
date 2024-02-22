import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { IQuestion } from '../../types';

export const fetchQuestions = createAsyncThunk<IQuestion[]>(
  'questions/fetchAll',
  async () => {
    const response = await axiosApi.get<IQuestion[]>('/questions');
    return response.data;
  }
);

export const fetchUserQuestions = createAsyncThunk<IQuestion[]>(
  'questions/fetchUserQuestions',
  async () => {
    const response = await axiosApi.get<IQuestion[]>('/questions/user/questions');
    return response.data;
  }
)

export const fetchOneQuestion = createAsyncThunk<IQuestion, string>(
  'questions/fetchOne',
  async (id) => {
    const response = await axiosApi.get<IQuestion>(`/questions/${id}`);
    return response.data;
  }
);

export const submitAnswer = createAsyncThunk<IQuestion, { id: string; title: string }>(
  'questions/submitAnswer',
  async ({ id, title }) => {
    const response = await axiosApi.post<IQuestion>(`/questions/${id}/answers`, { title });
    return response.data;
  }
);
