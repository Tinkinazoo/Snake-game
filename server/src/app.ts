import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import gameRoutes from './routes/gameRoutes';
import errorMiddleware from './middlewares/errorMiddleware';
import { NODE_ENV, PORT } from './utils/config';

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/game', gameRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Serve static files from client in production
if (NODE_ENV === 'production') {
  app.use(express.static('../client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });
}

export default app;
