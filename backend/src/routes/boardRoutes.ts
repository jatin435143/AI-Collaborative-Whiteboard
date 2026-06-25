import { Router } from "express";
import Board from "../models/Board.js";

const router = Router();

// GET board
router.get("/:roomId", async (req, res) => {
  try {
    const board = await Board.findOne({
      roomId: req.params.roomId,
    });

    if (!board) {
      return res.json({
        elements: [],
        appState: {},
      });
    }

    res.json(board);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// SAVE board
router.put("/:roomId", async (req, res) => {
  try {
    const { elements, appState } = req.body;

    const board = await Board.findOneAndUpdate(
      {
        roomId: req.params.roomId,
      },
      {
        roomId: req.params.roomId,
        elements,
        appState,
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.json(board);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;