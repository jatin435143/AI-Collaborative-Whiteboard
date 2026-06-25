/**
 * Board REST routes — save and load board data from MongoDB.
 * TODO: Implement GET and PUT handlers.
 */
import { Router } from 'express';
// import Board from '../models/Board.js'; // TODO: use when implementing save/load

const router = Router();

// GET /api/boards/:roomId
router.get('/:roomId', async (_req, res) => {
  // TODO: Fetch board by roomId
  res.json({ message: 'Not implemented yet' });
});

// PUT /api/boards/:roomId
router.put('/:roomId', async (_req, res) => {
  // TODO: Save or update board
  res.json({ message: 'Not implemented yet' });
});

export default router;
