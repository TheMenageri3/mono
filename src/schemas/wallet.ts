import { z } from "zod";

//create
export const createWalletSchema = z.object({
  publicKey: z.string(),
  active: z.boolean(),
  profileId: z.string(),
});

//read
export const readWalletsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getWalletByPublicKeySchema = z.object({ publicKey: z.string() });

export const readDeletedWalletsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateWalletSchema = z.object({
  publicKey: z.string(),
  active: z.boolean(),
  profileId: z.string(),
});

//delete
export const deleteWalletSchema = z.object({
  publicKey: z.string(),
});
export const restoreWalletSchema = z.object({
  publicKey: z.string(),
});
