import express from 'express';
import {getUsersForSidebar  } from '../Controllers/user.controller.js';
import {auth} from "../Middlewares/auth.middleware.js";

const router = express.Router();
router.get("/get-users", auth, getUsersForSidebar);

export default router;