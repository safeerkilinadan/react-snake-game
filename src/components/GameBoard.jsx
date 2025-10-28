import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveSnake, setDirection, restartGame, GRID_SIZE, CELL_SIZE } from '../store/gameSlice';
import './GameBoard.scss';

export default function GameBoard() {
  const dispatch = useDispatch();
  const { snake, food, score, gameOver, speed } = useSelector((state) => state.snake);
  const [wrapGlow, setWrapGlow] = useState(false);

  // Keyboard input
  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case 'ArrowUp': dispatch(setDirection({ x: 0, y: -1 })); break;
        case 'ArrowDown': dispatch(setDirection({ x: 0, y: 1 })); break;
        case 'ArrowLeft': dispatch(setDirection({ x: -1, y: 0 })); break;
        case 'ArrowRight': dispatch(setDirection({ x: 1, y: 0 })); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dispatch]);

  // Detect wrapping between boundaries
  useEffect(() => {
    if (snake.length < 2) return;

    const head = snake[0];
    const prev = snake[1];

    // If difference is large → wrapped across grid
    if (Math.abs(head.x - prev.x) > 1 || Math.abs(head.y - prev.y) > 1) {
      setWrapGlow(true);
      setTimeout(() => setWrapGlow(false), 150);
    }
  }, [snake]);

  // Game loop
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      dispatch(moveSnake());
    }, speed);
    return () => clearInterval(interval);
  }, [dispatch, gameOver, speed]);

  return (
    <div className="game-container">
      <h2>🐍 Neon Snake</h2>
      <p>Score: {score}</p>

      <div
        className="board"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {/* Snake */}
        {snake.map((seg, i) => (
          <div
            key={i}
            className={`snake-segment ${i === 0 ? 'head' : ''} ${i === 0 && wrapGlow ? 'wrap-glow' : ''}`}
            style={{
              left: seg.x * CELL_SIZE,
              top: seg.y * CELL_SIZE,
            }}
          />
        ))}

        {/* Food */}
        <div
          className="food"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
          }}
        />

        {gameOver && (
          <div className="overlay">
            <h3>Game Over</h3>
            <button onClick={() => dispatch(restartGame())}>Restart</button>
          </div>
        )}
      </div>
      
      {/* 🧑‍💻 Developer credit */}
      <div className="developer-credit">
        Made with 💚 by <a href='https://github.com/safeerkilinadan/react-snake-game' target='_blank' className="dev-name">Safeer Kilinadan</a>
    </div>

    </div>
  );
}
