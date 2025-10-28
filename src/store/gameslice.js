import { createSlice } from '@reduxjs/toolkit';

export const GRID_SIZE = 20;
export const CELL_SIZE = 20;

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

const initialState = {
  snake: [{ x: 10, y: 10 }],
  direction: { x: 1, y: 0 },
  food: getRandomPosition(),
  score: 0,
  speed: 150,
  gameOver: false,
};

const gameSlice = createSlice({
  name: 'snake',
  initialState,
  reducers: {
    moveSnake(state) {
      if (state.gameOver) return;
      let head = { x: state.snake[0].x + state.direction.x, y: state.snake[0].y + state.direction.y };
      if (head.x >= GRID_SIZE) head.x = 0;
      if (head.x < 0) head.x = GRID_SIZE - 1;
      if (head.y >= GRID_SIZE) head.y = 0;
      if (head.y < 0) head.y = GRID_SIZE - 1;
      if (state.snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        state.gameOver = true;
        return;
      }
      state.snake.unshift(head);
      if (head.x === state.food.x && head.y === state.food.y) {
        state.food = getRandomPosition();
        state.score += 1;
        if (state.speed > 60) state.speed -= 5;
      } else {
        state.snake.pop();
      }
    },
    setDirection(state, action) {
      const newDir = action.payload;
      if (state.direction.x + newDir.x === 0 && state.direction.y + newDir.y === 0) return;
      state.direction = newDir;
    },
    restartGame() {
      return { ...initialState, food: getRandomPosition() };
    },
  },
});

export const { moveSnake, setDirection, restartGame } = gameSlice.actions;
export default gameSlice.reducer;
