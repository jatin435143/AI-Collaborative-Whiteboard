import { useEffect } from "react";
import { useParams } from "react-router-dom";

import Whiteboard from "../components/Whiteboard";
import Toolbar from "../components/Toolbar";
import { getSocket } from "../services/socket";

export default function Room() {
  const { roomId } = useParams();

  useEffect(() => {
    if (!roomId) return;

    const socket = getSocket();

    // Function to join the room
    const joinRoom = () => {
      console.log("✅ Connected:", socket.id);

      socket.emit("join-room", roomId);

      socket.emit("ping-test", "Hello from " + socket.id);
    };

    // Listen for connection
    socket.on("connect", joinRoom);

    // If already connected, join immediately
    if (socket.connected) {
      joinRoom();
    } else {
      socket.connect();
    }

    // Listen for ping messages
    const handlePing = (msg: string) => {
      console.log("📩", msg);
    };

    socket.on("ping-test", handlePing);

    return () => {
      socket.off("connect", joinRoom);
      socket.off("ping-test", handlePing);

      // IMPORTANT:
      // Do NOT disconnect the socket here.
      // We want the socket to stay alive while the app is running.
    };
  }, [roomId]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar roomId={roomId || ""} />

      <div style={{ flex: 1 }}>
        <Whiteboard roomId={roomId || ""} />
      </div>
    </div>
  );
}