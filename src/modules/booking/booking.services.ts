import { and, eq } from "drizzle-orm";
import { seatsTable } from "../../common/config/db.schema.js";
import { db } from "../../common/config/index.js";
import { ApiError } from "../../common/utils/api-error.js";

const seats = async () => {
  const result = await db.select().from(seatsTable);
  if (!result) throw ApiError.serverNotResponding("server is not responding");

  return { result };
};

const bookingSeats = async (id: number, name: string) => {
  // transactions is using [for booking seats]
  try {
    await db.transaction(async (seats) => {
      const seatsResult = await seats
        .select()
        .from(seatsTable)
        .where(eq(seatsTable.id, id))
        .for("update"); // lock the row till confirms

      if (seatsResult[0]?.isBooked === 1) {
        throw ApiError.notAvailable("seat is not Available");
      }

      await seats
        .update(seatsTable)
        .set({ name, isBooked: 1 })
        .where(eq(seatsTable.id, id));
    });
  } catch (error) {
    throw ApiError.notAvailable(`booking rejected ${error}`);
  }
};
export { seats, bookingSeats };
