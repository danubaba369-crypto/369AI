import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../shared/schema";
import pg from "pg";

const { Pool } = pg;

export let db: any = null;
export let pool: any = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
}
