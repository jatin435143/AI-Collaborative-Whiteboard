import { useEffect, useRef } from "react";
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
        onChange={(elements) => {
          if (isRemoteUpdate.current) return;

          socket.emit("board-update", elements);
        }}
      />
    </div>
  );
}