import express from "express";
import fileUpload from "express-fileupload";
import { cloudinaryConnect } from "./Config/cloudinary.config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudinaryConnect();

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
app.use("/api/v1/message", messageRoutes);

export { app };
