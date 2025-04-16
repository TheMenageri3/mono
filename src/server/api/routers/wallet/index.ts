import { createTRPCRouter } from "@/server/api/trpc";
import { createWallet } from "./create";
import { readWallets, readDeletedWallets, getWalletByPublicKey } from "./read";
import { updateWallet } from "./update";
import { deleteWallet, restoreWallet } from "./delete";

export const walletRouter = createTRPCRouter({
  create: createWallet,
  read: readWallets,
  readDeleted: readDeletedWallets,
  getByPublicKey: getWalletByPublicKey,
  update: updateWallet,
  delete: deleteWallet,
  restore: restoreWallet,
});
