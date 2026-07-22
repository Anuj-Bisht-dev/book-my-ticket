import { Request, Response } from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import * as bookingService from "./booking.services.js";
import { ApiError } from "../../common/utils/api-error.js";
import { bookingSeatData } from "./booking.models.js";
import { ApiResponse } from "../../common/utils/api-response.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const homeController = async (req: Request, res: Response) => {
  try {
    res.sendFile(path.join(__dirname, "../../.." + "/index.html"));
  } catch (error) {
    throw ApiError.serverNotResponding("Server is not Responding");
  }
};

const seatsController = async (req: Request, res: Response) => {
  const seatsNumber = await bookingService.seats();
  res.send(seatsNumber.result);
};

const bookingSeatsController = async (req: Request, res: Response) => {
  const userSeatData = bookingSeatData.safeParse(req.body);

  if (userSeatData.error)
    throw ApiError.badRequest("user name or seat number is missleading");
  const { id, name } = userSeatData.data;

  await bookingService.bookingSeats(id, name);

  return ApiResponse.ok(res, "seats has booked successfully");
};

export { homeController, seatsController, bookingSeatsController };
