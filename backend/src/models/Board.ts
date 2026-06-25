/**
 * Board Mongoose model — stores Excalidraw scene data per room.
 */
import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, unique: true },
    elements: { type: Array, default: [] },
    appState: { type: Object, default: {} },
  },
  { timestamps: true },
);

export default mongoose.model('Board', boardSchema);
