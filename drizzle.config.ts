import { defineConfig } from "drizzle-kit";

const URL = process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL as string;

export default defineConfig({
  schema: "./config/database/schema.ts",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: "",
  }
});