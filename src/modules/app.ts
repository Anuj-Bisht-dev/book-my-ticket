import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { handleAuthRoutes } from "./auth/auth.routes.js";
import { handleBookingRoutes } from "./booking/booking.routes.js";
import { authenticationAddAccessToken } from "./auth/auth.middleware.js";

export const handleApplication = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(cookieParser());
  app.use(authenticationAddAccessToken());

  app.use("/api/auth", handleAuthRoutes);
  app.use(handleBookingRoutes);

  return app;
};
