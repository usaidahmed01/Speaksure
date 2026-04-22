import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosClient from '../api/axiosClient';

export const fetchMyProgress = createAsyncThunk(
  'progress/fetchMyProgress',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axiosClient.get('/progress', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch progress'
      );
    }
  }
);

const initialState = {
  progress: [],
  userStats: {
    totalXP: 0,
    completedLessons: 0,
    completedQuizzes: 0,
  },
  loading: false,
  error: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    clearProgress: (state) => {
      state.progress = [];
      state.userStats = {
        totalXP: 0,
        completedLessons: 0,
        completedQuizzes: 0,
      };
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload.progress || [];
        state.userStats = action.payload.userStats || {
          totalXP: 0,
          completedLessons: 0,
          completedQuizzes: 0,
        };
      })
      .addCase(fetchMyProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProgress } = progressSlice.actions;
export default progressSlice.reducer;