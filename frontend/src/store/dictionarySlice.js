import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchWord = createAsyncThunk(
  'dictionary/searchWord',
  async (word, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      return response.data[0];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.title ||
          'Word not found. Please try another word.'
      );
    }
  }
);

const initialState = {
  wordData: null,
  loading: false,
  error: null,
};

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    clearDictionary: (state) => {
      state.wordData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchWord.fulfilled, (state, action) => {
        state.loading = false;
        state.wordData = action.payload;
      })
      .addCase(searchWord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.wordData = null;
      });
  },
});

export const { clearDictionary } = dictionarySlice.actions;
export default dictionarySlice.reducer;