import { Router } from "express";
import {
  bookingSeatsController,
  homeController,
  seatsController,
  serveLoginPageController,
} from "./booking.controller.js";
import { authentication } from "../../common/middlewares/authentication.middleware.js";

export const handleBookingRoutes = Router();

handleBookingRoutes.get("/home", homeController);
handleBookingRoutes.get("/seats", seatsController);
handleBookingRoutes.put(
  "/booking-seats",
  authentication(),
  bookingSeatsController
);
handleBookingRoutes.get("/login-page", serveLoginPageController);
