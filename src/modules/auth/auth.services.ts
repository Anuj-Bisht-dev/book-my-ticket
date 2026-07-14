import { eq } from "drizzle-orm";
import { db } from "../../common/config/index.js";
import { seatsTable, userTable } from "../../common/config/db.schema.js";

const register = async (name: string, email: string, password: string) => {
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));
};
