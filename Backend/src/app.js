import express from "express";
import fileUpload from "express-fileupload";

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
import { cloudinaryConnect } from "./Config/cloudinary.config.js";

app.use("/api/v1/auth", authRoutes);

export { app };
