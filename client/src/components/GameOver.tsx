import React from 'react';
import { GameOverProps } from '../types';

const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
  return (
    <div className="game-over">
      <h1>Game Over</h1>
      <p>Your score: {score}</p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
};

export default GameOver;
