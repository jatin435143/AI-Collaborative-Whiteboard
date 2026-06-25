import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3001";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Connect Error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Disconnected:", reason);
    });
  }

  return socket;
}