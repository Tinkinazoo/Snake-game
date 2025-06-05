export type GameState = 'start' | 'playing' | 'gameOver';

export interface Position {
  x: number;
  y: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface GameProps {
  onGameOver: (score: number) => void;
}

export interface StartScreenProps {
  onStart: () => void;
}

export interface GameOverProps {
  score: number;
  onRestart: () => void;
}
