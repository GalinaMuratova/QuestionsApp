import { createSlice } from '@reduxjs/toolkit';
import { IQuestion } from '../../types';
import { RootState } from '../../app/store';
import { fetchOneQuestion, fetchQuestions } from './questionsThunk';

interface QuestionsState {
  items: IQuestion[];
  item: IQuestion | null;
  fetchLoading: boolean;
  fetchOne: boolean;
}

const initialState: QuestionsState = {
  items: [],
  item: null,
  fetchLoading: false,
  fetchOne: false,
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchQuestions.fulfilled, (state, {payload: questions}) => {
      state.fetchLoading = false;
      state.items = questions;
    });
    builder.addCase(fetchQuestions.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOneQuestion.pending, (state) => {
      state.fetchOne = true;
    });

    builder.addCase(fetchOneQuestion.fulfilled, (state, {payload: question}) => {
      state.fetchOne = false;
      state.item = question;
    });
    builder.addCase(fetchOneQuestion.rejected, (state) => {
      state.fetchOne = false;
    });
  }
});

export const questionsReducer = questionsSlice.reducer;
export const selectQuestions = (state: RootState) => state.questions.items;
export const selectOneQuestion = (state: RootState) => state.questions.item;
export const selectQuestionsLoading = (state: RootState) => state.questions.fetchLoading;
export const selectOneQuestionLoading = (state: RootState) => state.questions.fetchOne;
