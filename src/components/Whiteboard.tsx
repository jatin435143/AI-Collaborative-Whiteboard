import { useEffect, useRef, useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

import { getSocket } from "../services/socket";
import { api } from "../services/api";

import CursorLayer from "./CursorLayer";
import type { Cursor } from "../types/Cursor";

interface WhiteboardProps {
  roomId: string;
}

export default function Whiteboard({ roomId }: WhiteboardProps) {
  const socket = getSocket();

  const apiRef = useRef<any>(null);

  const isRemoteUpdate = useRef(false);

  const saveTimeout = useRef<number | null>(null);

  const [cursors, setCursors] = useState<Cursor[]>([]);

  // ===============================
  // Receive board updates
  // ===============================
  useEffect(() => {
    const handleBoardUpdate = (elements: any[]) => {
      isRemoteUpdate.current = true;

      apiRef.current?.updateScene({
        elements,
      });

      requestAnimationFrame(() => {
        isRemoteUpdate.current = false;
      });
    };

    socket.on("board-update", handleBoardUpdate);

    return () => {
      socket.off("board-update", handleBoardUpdate);
    };
  }, [socket]);

  // ===============================
  // Load board from MongoDB
  // ===============================
  useEffect(() => {
    async function loadBoard() {
      try {
        const board: any = await api.getBoard(roomId);

        if (board?.elements) {
          apiRef.current?.updateScene({
            elements: board.elements,
            appState: board.appState ?? {},
          });

          console.log("✅ Board Loaded");
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadBoard();
  }, [roomId]);

  // ===============================
  // Receive remote cursors
  // ===============================
  useEffect(() => {
    const handleCursor = (cursor: Cursor) => {
      setCursors((prev) => {
        const others = prev.filter((c) => c.id !== cursor.id);
        return [...others, cursor];
      });
    };

    socket.on("cursor-move", handleCursor);

    return () => {
      socket.off("cursor-move", handleCursor);
    };
  }, [socket]);

  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 56px)",
        position: "relative",
      }}
      onMouseMove={(e) => {
        socket.emit("cursor-move", {
          x: e.clientX,
          y: e.clientY,
        });
      }}
    >
      <Excalidraw
        excalidrawAPI={(api) => {
          apiRef.current = api;
        }}
        onChange={(elements, appState) => {
          if (isRemoteUpdate.current) return;

          socket.emit("board-update", elements);

          if (saveTimeout.current) {
            clearTimeout(saveTimeout.current);
          }

          saveTimeout.current = window.setTimeout(async () => {
            try {
              await api.saveBoard(roomId, {
                elements,
                appState,
              });

              console.log("💾 Board Saved");
            } catch (err) {
              console.error(err);
            }
          }, 500);
        }}
      />

      <CursorLayer cursors={cursors} />
    </div>
  );
}