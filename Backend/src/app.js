import express from "express";
import fileUpload from "express-fileupload";
import { cloudinaryConnect } from "./Config/cloudinary.config.js";
import cors from "cors";

const app = express();

// CORS setup
const corsOptions = {
  origin: ["https://chat-app-frontend-1.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// Body parser with limits
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// File upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp",
  })
);

// Cloudinary config
cloudinaryConnect();

// Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Chat-App backend",
  });
});

import authRoutes from "./Routes/auth.routes.js";
import userRoutes from "./Routes/user.routes.js";
import messageRoutes from "./Routes/message.routes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/messages", messageRoutes);

export { app };
