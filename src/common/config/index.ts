import "dotenv/config";
import { Pool } from "pg";
import { env } from "./config.env.js";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  connectionString: env.DATABASE_URL,

  max: 20, // maximum simultaneous connections (default is 10) - but recommended
  idleTimeoutMillis: 30_000, // close idel connection in 30s
  connectionTimeoutMillis: 5_000, // wait up to 5s for connection
});

export const db = drizzle({
  client: pool,
});
