import express from "express";
import { login, signup, logout } from "../controllers/auth.js";
import passport from "passport";

const router = express.Router();

router.post("/login",login);
router.post("/signup", signup);
router.get("/logout", logout);
// router.get("/unauthorize", unathorized);

export default router;
