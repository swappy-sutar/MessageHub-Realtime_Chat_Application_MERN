import express from 'express';
import {
  getMessages,
  sendMessages,
} from "../Controllers/message.controller.js";
import {auth} from "../Middlewares/auth.middleware.js";

const router = express.Router();
router.get("/:id", auth, getMessages);
router.post("/send/:id", auth, sendMessages);


export default router;