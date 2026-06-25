/**
 * Server entry point — starts HTTP server, Socket.IO, and MongoDB.
 */
import { createServer } from 'http';
import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';
import { initSocket } from './socket.js';

dotenv.config();

const PORT = process.env.PORT ?? 3001;

async function start() {
  await connectDB();

  const httpServer = createServer(app);
  initSocket(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
