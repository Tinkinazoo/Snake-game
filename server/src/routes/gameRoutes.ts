import { Router } from 'express';
import {
  saveScore,
  getHighScores,
  getPlayerStats,
} from '../controllers/gameController';
import { validateSaveScore } from '../middlewares/validationMiddleware';

const router = Router();

// Save player score
router.post('/scores', validateSaveScore, saveScore);

// Get high scores
router.get('/scores', getHighScores);

// Get player stats
router.get('/stats/:playerId', getPlayerStats);

export default router;
