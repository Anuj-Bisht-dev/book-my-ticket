import express from "express";
import { handleRoutes } from "./auth/auth.routes.js";
import cookieParser from "cookie-parser";
import { authenticationAddAccessToken } from "./auth/auth.middleware.js";

export const handleApplication = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(authenticationAddAccessToken());

  app.use("/api/auth", handleRoutes);

  return app;
};
