// validationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator';

/**
 * Валидация данных пользователя при регистрации/авторизации
 */
export const validateUserInput = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Имя пользователя должно быть от 3 до 20 символов')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Имя пользователя может содержать только буквы, цифры и подчеркивания'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Пароль должен быть не менее 6 символов')
    .matches(/\d/)
    .withMessage('Пароль должен содержать хотя бы одну цифру'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

/**
 * Валидация запроса на создание новой игры
 */
export const validateNewGameRequest = [
  body('playerId')
    .isString()
    .notEmpty()
    .withMessage('Неверный идентификатор игрока'),

  body('gameType')
    .isIn(['single', 'multiplayer'])
    .withMessage('Недопустимый тип игры'),

  body('difficulty')
    .optional()
    .isIn(['easy', 'medium', 'hard'])
    .withMessage('Недопустимый уровень сложности'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

/**
 * Общий обработчик ошибок валидации
 */
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Ошибка валидации',
      errors: errors.array().map(err => ({
       // param: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

/**
 * Проверка аутентификации пользователя
 */
export const authenticateUser = (req: Request | any, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'Требуется аутентификация'
    });
  }
  next();
};

/**
 * Проверка прав доступа к игре
 */
export const checkGameAccess = (req: Request | any, res: Response, next: NextFunction) => {
  const { gameId } = req.params;
  const userId = req.user.id;

  // Здесь должна быть логика проверки, что пользователь имеет доступ к игре
  // Например, проверка в базе данных
  if (!hasAccessToGame(userId, gameId)) {
    return res.status(403).json({
      status: 'error',
      message: 'Нет доступа к этой игре'
    });
  }

  next();
};

// Вспомогательная функция (заглушка)
function hasAccessToGame(userId: string, gameId: string): boolean {
  // Реальная реализация должна проверять доступ в базе данных
  return true;
}
