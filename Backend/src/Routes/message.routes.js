import express from 'express';
import {
  getMessages,
  sendMessages,
  getUsersForSidebar,
} from "../Controllers/message.controller.js";
import {auth} from "../Middlewares/auth.middleware.js";

const router = express.Router();
router.get("/users", auth, getUsersForSidebar);
router.get("/:id", auth, getMessages);
router.post("/send/:id", auth, sendMessages);


export default router;