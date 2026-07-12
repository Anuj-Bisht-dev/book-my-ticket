import { pgTable, integer, varchar, timestamp, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),  
  name: varchar("name").notNull(),
  isBooked: integer("is_booked").default(0).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
