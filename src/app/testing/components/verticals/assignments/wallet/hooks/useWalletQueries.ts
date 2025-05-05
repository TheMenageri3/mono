import { api } from "@/trpc/react";
import type { z } from "zod";
import {
  readWalletsSchema,
  getWalletByPublicKeySchema,
  readDeletedWalletsSchema,
} from "@/schemas";

// Type inference from schemas
type ReadWalletsInput = z.infer<typeof readWalletsSchema>;
type GetWalletByPublicKeyInput = z.infer<typeof getWalletByPublicKeySchema>;
type ReadDeletedWalletsInput = z.infer<typeof readDeletedWalletsSchema>;

export const useWalletQueries = () => {
  const useAllWallets = (
    input: ReadWalletsInput = { limit: 10, offset: 0 }
  ) => {
    return api.wallet.read.useQuery(input);
  };

  const useWalletByPublicKey = (input: GetWalletByPublicKeyInput) => {
    return api.wallet.getByPublicKey.useQuery(input);
  };

  const useDeletedWallets = (
    input: ReadDeletedWalletsInput = { limit: 10, offset: 0 }
  ) => {
    return api.wallet.readDeleted.useQuery(input);
  };

  return {
    useAllWallets,
    useWalletByPublicKey,
    useDeletedWallets,
  };
};
