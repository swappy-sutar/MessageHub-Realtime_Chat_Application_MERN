import express from "express";
import { signupUser, loginUser} from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);


export default router;