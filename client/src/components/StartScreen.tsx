import React from 'react';
import { StartScreenProps } from '../types';

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="start-screen">
      <h1>WebGL Snake Game</h1>
      <button onClick={onStart}>Start Game</button>
    </div>
  );
};

export default StartScreen;
