import app from './app';
import { PORT } from './utils/config';
import { connectToDatabase } from './utils/database'; // Если будете добавлять БД

const startServer = async () => {
  try {
    // await connectToDatabase(); // Для будущего подключения к БД
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
