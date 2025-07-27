import { Server } from "socket.io";
import http from "http";
import { app } from "../app.js"; // Express app

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://chat-app-frontend-1.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

const getReceiverSocketID = (userId) => {
  return userSocketMap[userId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.auth?.userId;
  console.log(`⚡ User connected: ${socket.id}`);

  if (userId) {
    userSocketMap[userId] = socket.id;
  } else {
    console.warn("⚠ No userId found in handshake.auth!");
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, getReceiverSocketID };
