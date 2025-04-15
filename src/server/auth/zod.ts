import { object, string } from "zod";

const passwordSchema = string({ required_error: "Password is required" })
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(32, "Password must be less than 32 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: passwordSchema,
});

export const signUpSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: passwordSchema,
  confirmPassword: string({
    required_error: "Please confirm your password",
  }).min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
