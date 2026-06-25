import { useEffect, useRef } from "react";
import { api } from "../services/api";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

import { getSocket } from "../services/socket";

interface WhiteboardProps {
  roomId: string;
}

export default function Whiteboard({ roomId }: WhiteboardProps) {
  const socket = getSocket();

  const apiRef = useRef<any>(null);

  const isRemoteUpdate = useRef(false);
  const saveTimeout = useRef<number | null>(null);

  useEffect(() => {
    const handleBoardUpdate = (elements: any[]) => {
      console.log("📥 Received board update");

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

  useEffect(() => {
    async function loadBoard() {
      try {
        const board: any = await api.getBoard(roomId);
  
        if (board?.elements?.length) {
          apiRef.current?.updateScene({
            elements: board.elements,
            appState: board.appState ?? {},
          });
  
          console.log("✅ Board loaded");
        }
      } catch (err) {
        console.error("Failed to load board", err);
      }
    }
  
    loadBoard();
  }, [roomId]);

  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 56px)",
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
        
              console.log("💾 Board saved");
            } catch (err) {
              console.error(err);
            }
          }, 500);
        }}
      />
    </div>
  );
}