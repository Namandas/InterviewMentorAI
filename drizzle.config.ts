import { defineConfig } from "drizzle-kit";

const URL = process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL as string;

export default defineConfig({
  schema: "./config/database/schema.ts",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:lgxkrncN8Wh9@ep-autumn-bar-a5vu35v2.us-east-2.aws.neon.tech/neondb?sslmode=require",
  }
});