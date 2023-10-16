import { Config } from "drizzle-kit";

// .env connot be accessed at root folder thats why we use 'dotenv'
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
    driver: "pg",
    schema: "./lib/db/schema.ts",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
} satisfies Config;

// npx drizzle-kit push:pg
// npz drizzle-kit studio
