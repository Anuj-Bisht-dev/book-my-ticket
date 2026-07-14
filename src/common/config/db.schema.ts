import {
  pgTable,
  varchar,
  timestamp,
  uuid,
  boolean,
  serial,
  integer,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", {length: 100}).notNull(),

  email: varchar("email", { length: 322 }).notNull(),
  verifyEmail: boolean("verify_email").default(false),

  verificationToken: varchar("verification_token"),
  verificationTokenExpiresIn: timestamp("verification_token_expires_in"),

  password: varchar("password", {length: 66}).notNull(),

  refreshToken: varchar("refresh_token"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});


export const seatsTable = pgTable("seats", {
  id: serial("id").primaryKey(),
  name: varchar("name", {length: 100}),
  isBooked: integer("is_booked").default(0),
});
