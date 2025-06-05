import React, { useEffect, useRef, useState } from 'react';
import { GameProps, Position, Direction } from '../types';
import * as glUtils from '@utils/glUtils';
import * as shaderUtils from '@utils/shaderUtils';
import vertexShaderSource from '@shaders/vertex.glsl';
import fragmentShaderSource from '@shaders/fragment.glsl';
import ScoreBoard from './ScoreBoard';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

const Game: React.FC<GameProps> = ({ onGameOver }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [nextDirection, setNextDirection] = useState<Direction>('RIGHT');
  const gameLoopRef = useRef<number>();
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);

  // Initialize WebGL
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = glUtils.initWebGL(canvas);
    if (!gl) return;

    glRef.current = gl;

    // Set canvas size
    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE;

    // Create shaders and program
    const vertexShader = shaderUtils.createShader(
      gl,
      gl.VERTEX_SHADER,
      vertexShaderSource
    );
    const fragmentShader = shaderUtils.createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    if (!vertexShader || !fragmentShader) return;

    const program = shaderUtils.createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    programRef.current = program;
    gl.useProgram(program);

    // Set clear color
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return () => {
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
      }
    };
  }, []);

  // Generate random food position
  const generateFood = (): Position => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    
    // Make sure food doesn't spawn on snake
    const isOnSnake = snake.some(segment => segment.x === x && segment.y === y);
    if (isOnSnake) return generateFood();
    
    return { x, y };
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setNextDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setNextDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setNextDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setNextDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  // Game loop
  useEffect(() => {
    if (!glRef.current || !programRef.current) return;

    const moveSnake = () => {
      setDirection(nextDirection);

      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };

        // Move head based on direction
        switch (nextDirection) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        // Check for collisions with walls
        if (
          head.x < 0 ||
          head.x >= GRID_SIZE ||
          head.y < 0 ||
          head.y >= GRID_SIZE
        ) {
          onGameOver(score);
          return prevSnake;
        }

        // Check for collisions with self
        if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          onGameOver(score);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check if snake ate food
        if (head.x === food.x && head.y === food.y) {
          setFood(generateFood());
          setScore(prev => prev + 10);
          // Increase speed every 50 points
          if (score > 0 && score % 50 === 0) {
            setSpeed(prev => Math.max(prev - 10, 50));
          }
        } else {
          // Remove tail if no food eaten
          newSnake.pop();
        }

        return newSnake;
      });
    };

    gameLoopRef.current = window.setInterval(moveSnake, speed);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [speed, nextDirection, food, score, onGameOver]);

  // Render game
  useEffect(() => {
    const gl = glRef.current;
    const program = programRef.current;
    if (!gl || !program) return;

    // Clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw snake
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      const color = isHead ? [0.0, 1.0, 0.0, 1.0] : [0.0, 0.8, 0.0, 1.0];
      
      drawSquare(
        gl,
        program,
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        color
      );
    });

    // Draw food
    drawSquare(
      gl,
      program,
      food.x * CELL_SIZE,
      food.y * CELL_SIZE,
      CELL_SIZE,
      [1.0, 0.0, 0.0, 1.0]
    );
  }, [snake, food]);

  // Draw a square
  const drawSquare = (
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    x: number,
    y: number,
    size: number,
    color: number[]
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert pixel coordinates to clip space
    const x1 = (x / canvas.width) * 2 - 1;
    const y1 = 1 - (y / canvas.height) * 2;
    const x2 = ((x + size) / canvas.width) * 2 - 1;
    const y2 = 1 - ((y + size) / canvas.height) * 2;

    // Define vertices for a square
    const vertices = [
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2,
    ];

    // Create buffer
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Get attribute location
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Set color
    const colorLocation = gl.getUniformLocation(program, 'u_color');
    gl.uniform4fv(colorLocation, color);

    // Draw
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };

  return (
    <div className="game-container">
      <ScoreBoard score={score} />
      <canvas ref={canvasRef} className="game-canvas" />
    </div>
  );
};

export default Game;
