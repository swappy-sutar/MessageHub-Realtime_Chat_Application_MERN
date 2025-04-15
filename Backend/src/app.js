import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Chat-App backend",
  });
});

import authRoutes from "./Routes/auth.routes.js";

app.use("/api/v1/auth", authRoutes);

export { app };
