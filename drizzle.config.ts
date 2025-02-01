import type { Config } from "drizzle-kit";
import { env } from "@/lib/env";
export default {
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DB_URL,
  },
} satisfies Config;
