import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { GlobalError, IQuestion } from '../../types';
import { isAxiosError } from 'axios';

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

export const submitAnswer = createAsyncThunk<IQuestion, { id: string; title: string },  { rejectValue: GlobalError }>(
  'questions/submitAnswer',
  async ({ id, title }, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<IQuestion>(`/questions/${id}/answers`, { title });
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const createQuestion = createAsyncThunk<IQuestion, { title: string }>(
  'questions/createQuestion',
  async ({ title }) => {
    const response = await axiosApi.post<IQuestion>('/questions', { title });
    return response.data;
  }
);

export const editQueston = createAsyncThunk<IQuestion, {id:string; title: string}>(
  'questions/editQuestion',
  async ({id, title}) => {
    const response = await axiosApi.put<IQuestion>(`/questions/${id}`, { title });
    return response.data;

  }
)

export const changeQuestionPublish = createAsyncThunk<void, string>(
  'questions/changePublish',
  async (id) => {
    await axiosApi.patch(`/questions/${id}`);
  },
);

export const deleteQuestion = createAsyncThunk<void, string>('questions/delete', async (id) => {
  await axiosApi.delete(`/questions/${id}`);
});

