import { Server } from "socket.io";
import http from "http";
import { app } from "../app.js"; 

const server = http.createServer(app);

const userSocketMap = {};

const getReceiverSocketID = (userId) => {
  return userSocketMap[userId.toString()];
};

const io = new Server(server, {
  cors: {
    origin: [
      "https://chat-app-by-er-swappy.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  const userId = socket.handshake.auth?.userId;

  if (userId) {
    userSocketMap[userId.toString()] = socket.id;
  } else {
    console.warn("⚠ No userId found in handshake.auth!");
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    if (userId) delete userSocketMap[userId.toString()];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, getReceiverSocketID };
