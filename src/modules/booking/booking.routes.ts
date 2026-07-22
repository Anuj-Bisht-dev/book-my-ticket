import { Router } from "express";
import {
  bookingSeatsController,
  homeController,
  seatsController,
} from "./booking.controller.js";

export const handleBookingRoutes = Router();

handleBookingRoutes.get("/home", homeController);
handleBookingRoutes.get("/seats", seatsController);
handleBookingRoutes.put("/booking-seats", bookingSeatsController);
