import { Server } from "socket.io";
import type { Server as HttpServer } from "http";

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
    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);

      // Save room id for later use
      socket.data.roomId = roomId;

      console.log(`✅ ${socket.id} joined room ${roomId}`);

      socket.emit("joined-room", roomId);
    });

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
    socket.on("disconnect", (reason) => {
      console.log(`❌ ${socket.id} disconnected`);
      console.log("Reason:", reason);
    });

    socket.on("ping-test", (message: string) => {
      console.log("📨", message);
    
      const roomId = socket.data.roomId;
    
      socket.to(roomId).emit("ping-test", message);
    });
  });
}