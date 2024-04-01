import express from "express";
import { login, signup, logout, forgotPassword, resetPassword, verifyMail, verification } from "../controllers/auth.js";
import passport from "passport";

const router = express.Router();

router.post("/login",login);
router.post("/signup", signup);
router.get("/logout", logout);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);
router.post("/verifymail", verifyMail);
router.post("/verification", verification)
// router.get("/unauthorize", unathorized);

export default router;
