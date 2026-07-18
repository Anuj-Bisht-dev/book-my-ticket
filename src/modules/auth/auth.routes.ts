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

export const handleRoutes = Router();

handleRoutes.get("/", (req, res) => {
  res.json({
    message: "server is working properly",
  });
});

handleRoutes.post("/register", registerController);
handleRoutes.get("/verify-email/:token", verifyEmailController);
handleRoutes.post("/sign-in", signInController);
handleRoutes.post("/sign-out/:userId", authentication, signOutController);
handleRoutes.post("/refresh-token", refreshTokenController);
handleRoutes.post("/forgot-password", forgotPasswordController);
handleRoutes.post("/reset-password", resetPasswordController);
