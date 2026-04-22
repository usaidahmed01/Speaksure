import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../store/authSlice';
import lessonReducer from '../store/lessonSlice';
import quizReducer from '../store/quizSlice';
import leaderboardReducer from '../store/leaderboardSlice';
import dictionaryReducer from '../store/dictionarySlice';
import progressReducer from '../store/progressSlice';
import themeReducer from '../store/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lessons: lessonReducer,
    quiz: quizReducer,
    leaderboard: leaderboardReducer,
    dictionary: dictionaryReducer,
    progress: progressReducer,
    theme: themeReducer,
  },
});