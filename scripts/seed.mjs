import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL);

// ここにINSERT文を書く
await sql`INSERT INTO categories (name) VALUES ('Processed foods'), ('Meat & Fish'), ('Dairy & Eggs')`;
