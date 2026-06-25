/**
 * Express app setup — middleware and routes.
 */
import express from 'express';
import cors from 'cors';
import boardRoutes from './routes/boardRoutes.js';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/boards', boardRoutes);

export default app;
