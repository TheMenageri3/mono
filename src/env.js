// env.js
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    EMAIL_USER: z.string().optional(), //required for production
    EMAIL_PASS: z.string().optional(), //required for production
    EMAIL_HOST: z.string().optional(), //required for production
    EMAIL_PORT: z.string().optional(), //required for production
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS : process.env.EMAIL_PASS,
    NODE_ENV: process.env.NODE_ENV,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
