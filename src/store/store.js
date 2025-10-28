import { configureStore } from '@reduxjs/toolkit';
import snakeReducer from './gameSlice';

const store = configureStore({
  reducer: {
    snake: snakeReducer,
  },
});

export default store;
