import { pgTable, integer, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  isBooked: integer("is_booked").default(0).notNull(),
});
