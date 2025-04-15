import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    // EMAIL_USER: z.string().optional(), //required for production
    // EMAIL_PASS: z.string().optional(), //required for production
    // EMAIL_HOST: z.string().optional(), //required for production
    // EMAIL_PORT: z.string().optional(), //required for production
    AUTH_SECRET: z.string().min(1), //required for authjs
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().url().optional(),
    VERCEL_URL: z.string().optional(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    // EMAIL_USER: process.env.EMAIL_USER,
    // EMAIL_PASS: process.env.EMAIL_PASS,
    NODE_ENV: process.env.NODE_ENV,
    // EMAIL_HOST: process.env.EMAIL_HOST,
    // EMAIL_PORT: process.env.EMAIL_PORT,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    VERCEL_URL: process.env.VERCEL_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
