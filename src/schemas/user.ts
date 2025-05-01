import { z } from "zod";
import { UserRole, UserStatus } from "@/generated/prisma";

//create
export const createUserSchema = z.object({
  email: z.string().email(),
  hashedPassword: z.string(),
  name: z.string().optional(),
  image: z.string().optional(),
  role: z.nativeEnum(UserRole),
  status: z.nativeEnum(UserStatus),
});

//read
export const readUserByWalletSchema = z.object({
  publicKey: z.string(),
});
export const readUsersSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readUserByEmailSchema = z.object({ email: z.string() });
export const readDeletedUsersSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
  status: z.nativeEnum(UserStatus).optional(),
});

//delete
export const deleteUserSchema = z.object({
  id: z.string().uuid(),
});
export const restoreUserSchema = z.object({
  id: z.string().uuid(),
});
