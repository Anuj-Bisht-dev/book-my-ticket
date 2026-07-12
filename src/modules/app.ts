import express from "express";
import { handleRoutes } from "./auth/auth.routes";

export const handleApplication = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use("/api/auth", handleRoutes);

  return app;
};
