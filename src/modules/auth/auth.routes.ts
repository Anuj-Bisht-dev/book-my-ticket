import Router from "express";
import {
  forgotPasswordController,
  refreshTokenController,
  registerController,
  resetPasswordController,
  signInController,
  signOutController,
  verifyEmailController,
} from "./auth.controller.js";
import { authentication } from "./auth.middleware.js";

export const handleAuthRoutes = Router();

handleAuthRoutes.get("/", (req, res) => {
  res.status(200).json({
    message: "server is working properly",
  });
});

handleAuthRoutes.post("/register", registerController);
handleAuthRoutes.get("/verify-email/:token", verifyEmailController);
handleAuthRoutes.post("/sign-in", signInController);
handleAuthRoutes.post("/sign-out/:userId", authentication, signOutController);
handleAuthRoutes.post("/refresh-token", refreshTokenController);
handleAuthRoutes.post("/forgot-password", forgotPasswordController);
handleAuthRoutes.post("/reset-password", resetPasswordController);
