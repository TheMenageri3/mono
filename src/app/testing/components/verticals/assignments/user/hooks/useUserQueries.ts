import { api } from "@/trpc/react";
import type { z } from "zod";
import {
  readUsersSchema,
  readUserByEmailSchema,
  readUserByWalletSchema,
  readDeletedUsersSchema,
} from "@/schemas";

// Infer types from schemas
type ReadUsersInput = z.infer<typeof readUsersSchema>;
type ReadUserByEmailInput = z.infer<typeof readUserByEmailSchema>;
type ReadUserByWalletInput = z.infer<typeof readUserByWalletSchema>;
type ReadDeletedUsersInput = z.infer<typeof readDeletedUsersSchema>;

export const useUserQueries = () => {
  const useAllUsers = (input: ReadUsersInput = { limit: 10, offset: 0 }) => {
    return api.user.read.useQuery(input);
  };

  const useUserByEmail = (input: ReadUserByEmailInput) => {
    return api.user.getByEmail.useQuery(input);
  };

  const useUserByWallet = (input: ReadUserByWalletInput) => {
    return api.user.getByWallet.useQuery(input);
  };

  const useDeletedUsers = (
    input: ReadDeletedUsersInput = { limit: 10, offset: 0 }
  ) => {
    return api.user.readDeleted.useQuery(input);
  };

  return {
    useAllUsers,
    useUserByEmail,
    useUserByWallet,
    useDeletedUsers,
  };
};
