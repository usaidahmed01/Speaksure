import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosClient from '../api/axiosClient';

export const fetchQuizByWeek = createAsyncThunk(
  'quiz/fetchQuizByWeek',
  async (weekNo, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axiosClient.get(`/quizzes/week/${weekNo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.quiz;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch quiz'
      );
    }
  }
);

export const submitQuiz = createAsyncThunk(
  'quiz/submitQuiz',
  async ({ quizId, answers }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axiosClient.post(
        `/quizzes/${quizId}/submit`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to submit quiz'
      );
    }
  }
);

const initialState = {
  currentQuiz: null,
  result: null,
  loading: false,
  submitting: false,
  error: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    clearQuizResult: (state) => {
      state.result = null;
    },
    clearQuizError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizByWeek.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentQuiz = null;
      })
      .addCase(fetchQuizByWeek.fulfilled, (state, action) => {
        state.loading = false;
        state.currentQuiz = action.payload;
      })
      .addCase(fetchQuizByWeek.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(submitQuiz.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.submitting = false;
        state.result = action.payload;
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      });
  },
});

export const { clearQuizResult, clearQuizError } = quizSlice.actions;
export default quizSlice.reducer;