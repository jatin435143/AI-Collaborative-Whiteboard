import { Server } from "socket.io";
import type { Server as HttpServer } from "http";

const rooms = new Map<
  string,
  {
    id: string;
    name: string;
    color: string;
  }[]
>();

export function initSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  console.log("🚀 Socket.IO initialized");

  io.on("connection", (socket) => {
    console.log("🔥 NEW CONNECTION");
    console.log("Socket ID:", socket.id);

    // Log every incoming event
    socket.onAny((event, ...args) => {
      console.log("📨 Event:", event);
      console.log("📦 Data:", args);
    });

    // ==========================
    // Join Room
    // ==========================
    socket.on(
      "join-room",
      ({ roomId, name }: { roomId: string; name: string }) => {
        socket.join(roomId);
    
        socket.data.roomId = roomId;
    
        const COLORS = [
          "#ef4444",
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#8b5cf6",
          "#ec4899",
        ];
    
        const roomUsers = rooms.get(roomId) || [];
    
        const newUser = {
          id: socket.id,
          name,
          color: COLORS[roomUsers.length % COLORS.length],
        };
    
        roomUsers.push(newUser);
    
        rooms.set(roomId, roomUsers);
    
        console.log(`${name} joined ${roomId}`);
    
        io.to(roomId).emit("users-updated", roomUsers);
      }
    );

    // ==========================
    // Whiteboard Updates
    // ==========================
    socket.on("board-update", (elements) => {
      const roomId = socket.data.roomId;
    
      console.log("Room ID:", roomId);
    
      if (!roomId) {
        console.log("❌ No room found!");
        return;
      }
    
      console.log("📢 Broadcasting to room:", roomId);
    
      socket.to(roomId).emit("board-update", elements);
    });

    // ==========================
    // Cursor Movement (Future)
    // ==========================
    socket.on("cursor-move", (cursor) => {
      const roomId = socket.data.roomId;

      if (!roomId) return;

      socket.to(roomId).emit("cursor-move", cursor);
    });

    // ==========================
    // Disconnect
    // ==========================
    socket.on("disconnect", () => {
      const roomId = socket.data.roomId;
    
      if (roomId) {
        const users = rooms.get(roomId) || [];
    
        const updatedUsers = users.filter(
          (user) => user.id !== socket.id
        );
    
        rooms.set(roomId, updatedUsers);
    
        io.to(roomId).emit("users-updated", updatedUsers);
      }
    
      console.log(`${socket.id} disconnected`);
    });

    socket.on("ping-test", (message: string) => {
      console.log("📨", message);
    
      const roomId = socket.data.roomId;
    
      socket.to(roomId).emit("ping-test", message);
    });
  });
}