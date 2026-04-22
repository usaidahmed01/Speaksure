import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosClient from '../api/axiosClient';

export const fetchLessons = createAsyncThunk(
  'lessons/fetchLessons',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axiosClient.get('/lessons', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.lessons;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch lessons'
      );
    }
  }
);

export const completeLesson = createAsyncThunk(
  'lessons/completeLesson',
  async (lessonId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axiosClient.post(
        `/lessons/${lessonId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        lessonId,
        ...response.data,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to complete lesson'
      );
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  completing: false,
  error: null,
};

const lessonSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    clearLessonError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(completeLesson.pending, (state) => {
        state.completing = true;
        state.error = null;
      })
      .addCase(completeLesson.fulfilled, (state) => {
        state.completing = false;
      })
      .addCase(completeLesson.rejected, (state, action) => {
        state.completing = false;
        state.error = action.payload;
      });
  },
});

export const { clearLessonError } = lessonSlice.actions;
export default lessonSlice.reducer;