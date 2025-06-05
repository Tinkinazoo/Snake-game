import React, { useState } from 'react';
import Game from '@components/Game';
import StartScreen from '@components/StartScreen';
import GameOver from '@components/GameOver';
import { GameState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);

  const handleGameStart = () => {
    setGameState('playing');
    setScore(0);
  };

  const handleGameOver = (finalScore: number) => {
    setScore(finalScore);
    setGameState('gameOver');
  };

  return (
    <div className="app">
      {gameState === 'start' && <StartScreen onStart={handleGameStart} />}
      {gameState === 'playing' && <Game onGameOver={handleGameOver} />}
      {gameState === 'gameOver' && (
        <GameOver score={score} onRestart={handleGameStart} />
      )}
    </div>
  );
};

export default App;
