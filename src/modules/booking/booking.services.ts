import { and, eq } from "drizzle-orm";
import { seatsTable } from "../../common/config/db.schema.js";
import { db } from "../../common/config/index.js";
import { ApiError } from "../../common/utils/api-error.js";
import { ApiResponse } from "../../common/utils/api-response.js";

const seats = async () => {
  const result = await db.select().from(seatsTable);
  if (!result) throw ApiError.serverNotResponding("server is not responding");

  return { result };
};

const bookingSeats = async (id: number, name: string) => {
  // transactions is using [for booking seats]
  try {
    db.transaction(async (seats) => {
      const seatsResult = await seats
        .select()
        .from(seatsTable)
        .where(eq(seatsTable.isBooked, 0));

      if (seatsResult.length === 0) {
        throw ApiError.notAvailable("all seats are already booked ");
      }

      await seats
        .update(seatsTable)
        .set({ isBooked: 1, name })
        .where(eq(seatsTable.id, id));
    });
  } catch (error) {
    throw ApiError.serverNotResponding(`booking rejected ${error}`);
  }
};
export { seats, bookingSeats };
