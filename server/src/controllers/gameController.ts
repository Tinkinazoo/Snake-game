import { Request, Response } from 'express';
//import { GameScore } from '../../models/gameScore'; // Модель для будущей БД

// Временное хранилище для демонстрации
const scores: Array<{ player: string; score: number; date: Date }> = [];

export const saveScore = async (req: Request, res: Response) => {
  try {
    const { player, score } = req.body;
    
    // В реальном приложении сохраняли бы в БД
    scores.push({ player, score, date: new Date() });
    scores.sort((a, b) => b.score - a.score);
    
    res.status(201).json({
      success: true,
      data: { player, score },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save score',
    });
  }
};

export const getHighScores = async (req: Request, res: Response) => {
  try {
    // Возвращаем топ-10 результатов
    const highScores = scores.slice(0, 10);
    
    res.status(200).json({
      success: true,
      data: highScores,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch high scores',
    });
  }
};

export const getPlayerStats = async (req: Request, res: Response) => {
  try {
    const { playerId } = req.params;
    
    const playerScores = scores
      .filter(score => score.player === playerId)
      .sort((a, b) => b.score - a.score);
    
    const highestScore = playerScores[0]?.score || 0;
    const averageScore = playerScores.length > 0 
      ? playerScores.reduce((sum, score) => sum + score.score, 0) / playerScores.length
      : 0;
    
    res.status(200).json({
      success: true,
      data: {
        player: playerId,
        gamesPlayed: playerScores.length,
        highestScore,
        averageScore: Math.round(averageScore),
        lastScores: playerScores.slice(0, 5),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch player stats',
    });
  }
};
