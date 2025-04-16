import express from "express";
import { signupUser, loginUser, updateProfile} from "../Controllers/auth.controller.js";
import { auth } from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.put("/update-profile", auth, updateProfile);


export default router;