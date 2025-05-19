import { createTRPCRouter } from "@/server/api/trpc";
import { createUser } from "./create";
import {
  readUsers,
  readUserByEmail,
  readDeletedUsers,
  readUserByWallet,
} from "./read";
import { updateUser } from "./update";
import { deleteUser, restoreUser } from "./delete";

export const userRouter = createTRPCRouter({
  create: createUser,
  read: readUsers,
  readDeleted: readDeletedUsers,
  getByWallet: readUserByWallet,
  getByEmail: readUserByEmail,
  update: updateUser,
  delete: deleteUser,
  restore: restoreUser,
});
