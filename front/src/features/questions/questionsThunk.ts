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

export const fetchOneQuestion = createAsyncThunk<IQuestion, string>(
  'questions/fetchOne',
  async (id) => {
    const response = await axiosApi.get<IQuestion>(`/questions/${id}`);
    return response.data;
  }
);
