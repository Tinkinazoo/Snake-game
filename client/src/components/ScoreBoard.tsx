import React from 'react';

interface ScoreBoardProps {
  score: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <div className="score-board">
      <h2>Score: {score}</h2>
    </div>
  );
};

export default ScoreBoard;
